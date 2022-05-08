<template>
  <div class="app-container">
    <h2 align="center">Welcome to City Charging Simulation !</h2>
    <div style="height:25px"></div>
    <div class="container-fluid py-4">
       <div class="row">
        <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div class="card">
            <div class="card-header p-3 pt-2">
              <div class="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                <i class="material-icons opacity-10">ev_station</i>
              </div>
              <div class="text-end pt-1">
                <p class="text-sm mb-0 text-capitalize">Number of CSs</p>
                <h4 class="mb-0">{{csNum}}</h4>
              </div>
            </div>
            <div class="card-footer p-3">
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div class="card">
            <div class="card-header p-3 pt-2">
              <div class="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                <i class="material-icons opacity-10">commute</i>
              </div>
              <div class="text-end pt-1">
                <p class="text-sm mb-0 text-capitalize">Today's EVs</p>
                <h4 class="mb-0">32190</h4>
              </div>
            </div>
            <div class="card-footer p-3">
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div class="card">
            <div class="card-header p-3 pt-2">
              <div class="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                <i class="material-icons opacity-10">paid</i>
              </div>
              <div class="text-end pt-1">
                <p class="text-sm mb-0 text-capitalize">Average Price</p>
                <h4 class="mb-0">84.9178</h4>
              </div>
            </div>
            <div class="card-footer p-3">
            </div>
          </div>
        </div>
       </div>
      </div>
    <div style="height:25px"></div>
    <div id="container" style="width: 100%; height: 500px;border-radius:25px" ></div>
    <div style="height:25px"></div>
    <button style="margin-left:40%;" class="btn mb-0 me-3 bg-gradient-info" @click="cal()">Search for best CS</button>
    <el-dialog width="30%" top="220px" :visible.sync="Visiable">
              <el-dialog width="25%" title="Result" :visible.sync="innerVisible" @opened="open_inner()" append-to-body>
                  <h6>Best CS : Charging Station {{result_cs}}</h6>
                  <h6>Price : {{result_price}}</h6>
                   <h6>Capacity : {{result_cap}}</h6>
                    <h6>Distance : {{result_dist}} km</h6>
              </el-dialog>
              <h6>Please choose time:</h6>
              <el-time-picker v-model="date" :picker-options="{
                       selectableRange: '9:00:00 - 11:30:00'
                   }" placeholder="Any Time">
              </el-time-picker>
              <span slot="footer" class="dialog-footer">
                 <el-button type="text" @click="confirm()" class="btn btn-outline-primary btn-sm mb-1" >Confirm</el-button>
              </span>
    </el-dialog>
  </div>
</template>

<script>
import markerIcon from '../assets/img/marker.png';
import markerIcon1 from '../assets/img/carmark.png';
export default {
  name: 'HomeView',
  data() {
    return {
      center: [117.1509645, 31.83057265],
      csNum: 5,
      zoom: 13,
      pitch: 45,
      rotation: 0,
      markerIcon,
      position: [],
      cstitle:[],
      cscap:[],
      markerList: [],
      map:null,
      dis: [],
      Visiable :false,
      innerVisible:false,
      date: new Date(2021,9,9,9,0),
      cap_now : [],
      price_now : [],
      result_dist:0,
      result_cap:0,
      result_price:0,
      result_cs:0,
    };
  },
  methods: {
    confirm(){
      var hour = this.date.getHours()
      var mint = this.date.getMinutes()
      var x = Math.trunc(mint/5) + (hour-9)*12
      this.$axios.post('http://127.0.0.1:5000/get_best_cs',{
              csNum:this.csNum,
              x:x,
            }).then(res=>{
                console.log(res.data)
                this.cap_now = res.data.cap
                this.price_now = res.data.price
                var minx =10000
                for(var i=0;i<this.csNum;i++)
                {
                  var tmp = 0.6*this.price_now[i] +3*this.dis[i]
                  if(tmp<minx){
                    minx=tmp
                    this.result_dist=this.dis[i].toFixed(3)
                    this.result_cap=this.cap_now[i]
                    this.result_price=this.price_now[i]
                    this.result_cs =i+1
                  }
                }
                this.open_inner()
          })
    },
    open_inner(){
      this.innerVisible=true
    },
    cal(){
      this.Visiable=true
    },

    caldis(){
      for(var i=0;i<this.csNum;i++)
      {
        var radLat1 = this.position[i][1]*3.1415926535897932384/180.0;
        var radLat2 = localStorage.carlat*3.1415926535897932384/180.0;
        var a = radLat1 - radLat2;
        var b = (this.position[i][0]-localStorage.carlng)*3.1415926535897932384/180.0;
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
        s = s * 6378.137;
        this.dis[i]=s;
      }
      console.log(this.dis)
    },
    drawmap(){
      var map = new AMap.Map('container', {
        zoom:13,//级别
        center: [117.1509645, 31.83057265],//中心点坐标
        viewMode:'3D'
    });
    this.map=map
    for(var i=0;i<this.csNum;i++) {
      var marker = new AMap.Marker({
                  position: new AMap.LngLat(this.position[i][0],this.position[i][1]),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                  icon: markerIcon,
                  offset: new AMap.Pixel(-30, -60),
                  title: this.cstitle[i]
      }); 
      marker.title = this.cstitle[i]
      marker.capacity = this.cscap[i]
      marker.dis = this.dis[i]
      this.markerList.push(marker);
      marker.on('click', function(p) {
                  var textContent = '<h5 style="color:orange">'+p.target.title+'</h5>'+
                                   '<ul>' +
                                  '<li>Capacity：' + p.target.capacity +  '</li>' + '<br/>' +
                                  '<li>Position：' +  p.lnglat.lat +', ' + p.lnglat.lng  + '</li>' + '<br/>' +
                                  '<li>Distance：' +  p.target.dis.toFixed(4)  + 'km</li>' +
                                  '</ul>'
                  var infoWindow = new AMap.InfoWindow({
                      content: textContent,
                      offset: new AMap.Pixel(-10, -20)
                  });
                  console.log(p.lnglat)
                  //打开信息窗口
                  infoWindow.open(map, p.lnglat); //后面的参数指的是经纬度，在此显示窗口
                })
    }
    map.add(this.markerList)
    var car_marker = new AMap.Marker({
                  position: new AMap.LngLat(localStorage.carlng,localStorage.carlat),   
                  offset: new AMap.Pixel(-30, -60),
                  icon: markerIcon1,
                  title: "Your current position."
    }); 
    car_marker.title =  "Your current position."
    car_marker.on('click', function(p) {
                  var textContent = '<h5 style="color:orange">'+p.target.title+'</h5>'+
                                   '<ul>' +
                                  '<li>Position：' +  p.lnglat.lat +', ' + p.lnglat.lng  + '</li>' +
                                  '</ul>'
                  var infoWindow = new AMap.InfoWindow({
                      content: textContent,
                      offset: new AMap.Pixel(-10, -20)
                  });
                  console.log(p.lnglat)
                  //打开信息窗口
                  infoWindow.open(map, p.lnglat); //后面的参数指的是经纬度，在此显示窗口
                })
    map.add(car_marker)
    }
  },
  mounted() {
    this.$axios.post('http://127.0.0.1:5000/get_all_cs'
            
            ).then(res=>{
                console.log(res.data)
                var length = res.data.length
                this.csNum = length
                for(var i=0;i<length;i++)
                {
                    this.cscap.push(res.data.capacity[i])
                    this.position.push([res.data.lng[i],res.data.lat[i]])
                    this.cstitle.push("Charging Position "+parseInt(i+1))
                }
                that.caldis();
                that.drawmap(); 
          })
    var that = this
     this.$axios.get('http://127.0.0.1:5000/profile/select',{
          params:{
            username:localStorage.username
          }
        }).then(res=>{
          console.log(res.data)
          localStorage.carlng = res.data.lng
          localStorage.carlat = res.data.lat 
        })
    // setTimeout(function() { 
    //   console.log(that.position)
    //   that.caldis();
    //   that.drawmap(); 
    //   }, 500); 
  },
}
</script>

<style scoped src="../assets/css/material-dashboard.css">
.mapborder {
      border:2px solid rgb(119, 107, 107);
      border-radius:15px;
}

</style> 
