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
             <hr class="dark horizontal my-0">
            <div class="card-footer p-3">
                  <p class="mb-0"><span class="text-sm font-weight-bolder" :class="arr1">{{csNumChangeString}}</span> than before</p>
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
                <h4 class="mb-0">{{evNum}}</h4>
              </div>
            </div>
             <hr class="dark horizontal my-0">
            <div class="card-footer p-3">
                  <p class="mb-0"> No change</p>
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
                <p class="text-sm mb-0 text-capitalize">Total Revenue</p>
                <h4 class="mb-0"> {{revenue}} </h4>
                
              </div>
            </div>
            <hr class="dark horizontal my-0">
            <div class="card-footer p-3">
                  <p class="mb-0"><span class="text-sm font-weight-bolder" :class="arr2">{{rChangeString}}%</span> than before</p>
            </div>
          </div>
        </div>
       </div>
      </div>
      <div style="height:25px"></div>
      <div id="mapcontainer" style="margin-left:8%; width: 84%; height: 450px;border-radius:25px" ></div>
      <div style="height:25px"></div>
      <button style="margin-left:18%;" class="btn mb-0 me-3 bg-gradient-info" @click="add()">Add Charging Station</button>
      <button style="margin-left:18%;" class="btn mb-0 me-3 bg-gradient-info" @click="cal()" v-loading.fullscreen.lock="fullscreenLoading">Calculate Revenue</button>
      <el-dialog title="Sure to add CS here?" width="30%" :visible.sync="Visiable" @close="close()">
              <h6>Please enter the capacity(between 2 to 20):</h6>
              <div class="input-group input-group-outline mb-3">
                      <!-- <label class="form-label">Password</label> -->
                      <input type="text" v-model="cap" class="form-control" >
              </div>
              <h6>The required cost of the site:</h6>
              <div class="input-group input-group-outline mb-3">
                      <!-- <label class="form-label">Password</label> -->
                      <input disabled type="text" v-model="cost" class="form-control" >
              </div>
              <span slot="footer" class="dialog-footer">
                 <el-button type="text" @click="confirm()" class="btn btn-outline-primary btn-sm mb-1" >Confirm</el-button>
              </span>
    </el-dialog>
    <el-dialog width="30%" :visible.sync="deleteVisiable" @close="close()">
              <h6>Comfirm to delete this CS?</h6>
              <span slot="footer" class="dialog-footer">
                 <el-button type="text" @click="Delete()" class="btn btn-outline-primary btn-sm mb-1" >Confirm</el-button>
              </span>
    </el-dialog>
  </div>
</template>

<script>
import markerIcon from '../assets/img/marker.png';
import qs from 'qs'
// import markerIcon1 from '../assets/img/carmark.png';
// import request from '@/utils/request'
export default {
  name: 'ManagerHome',
  data() {
    return {
      csNum: 0,
      evNum: 32190,
      revenue:12312,
      addflag:false,
      Visiable:false,
      deleteVisiable:false,
      center: [117.1509645, 31.83057265],
      position:[],
      cap:'',
      cap_list:[],
      cost_list:[],
      deleteLng:0,
      deleteLat:0,
      Lng:0,
      Lat:0,
      cost:0,
      revenueChange:0,
      csNumchange:0,
      rChangeString:'',
      csNumChangeString:'',
      map:null,
      marker_now:null,
      arr1:[],
      arr2:[],
      last_csNum:0,
      last_revenue:0,
      fullscreenLoading:false,
      cal_complete:0,
    };
  },
  watch:{
    cal_complete:{
      handler() {
          console.log("cal_complete is changed")
          if(this.cal_complete==1) this.fullscreenLoading = false;
      },
    }
  },
  methods: {
      add(){
          this.$message('Click the map to add CS');
          this.addflag=true
        //   console.log(this.map.getZoom())
        //   console.log(this.map.getCenter().lat)
      },
      cal(){
          if(this.csNum == 0)
          {
              const h = this.$createElement;
              this.$notify.error({
                title: 'Calculating Failed',
                message: h('i', { style: 'color: teal'}, 'The csNum cannot be 0')
              });
          }
          else{
            this.cal_complete = 0
            this.$axios.post('http://127.0.0.1:5000/calculate',{
            params:{
                csNum:this.csNum,
                position:this.position,
                capacity:this.cap_list,
                cost:this.cost_list
            },
            paramsSerializer: params => {
                return qs.stringify(params, { indices: false })
            }
            }).then(res=>{
                console.log(res.data)
                this.cal_complete=1
                this.revenue = res.data.total_revenue
                this.csNumchange = this.csNum - this.last_csNum
                this.revenueChange = (this.revenue - this.last_revenue)/this.last_revenue*100
                this.revenueChange = Math.floor(this.revenueChange*100)/100
                this.changeArr()
                this.last_csNum = this.csNum
                this.last_revenue = this.revenue
                localStorage.csNum = this.csNum
            })
            this.fullscreenLoading = true;
          }
          
      },
      close(){
          this.addflag=false
      },
      confirm(){
          if(this.cap==''||this.cap.toString()<2||this.cap.toString()>20)
          {
              const h = this.$createElement;
              this.$notify.error({
                title: 'Adding Failed',
                message: h('i', { style: 'color: teal'}, 'Input does not meet the specification')
              });
          }
          else{
            this.csNum=this.csNum+1
            this.position.push([this.Lng,this.Lat])
            this.cap_list.push(parseInt(this.cap))
            this.cost_list.push(this.cost)
            this.Visiable=false
            this.addmarker()
            console.log(this.position)
            console.log(this.cap_list)
            console.log(this.cost_list)
          }
      },
      Delete(){
          this.deleteLng=this.marker_now.target.lng
          this.deleteLat=this.marker_now.target.lat
          console.log(this.deleteLng,this.deleteLat)
          for (var i = 0;i<this.position.length; i++) {
    		if (this.position[i][0] == this.deleteLng&&this.position[i][1] == this.deleteLat)
            {
                console.log("delete the"+i+" CS")
                this.position.splice(i, 1);
                this.cap_list.splice(i, 1);
            }
    	}
          this.csNum=this.csNum-1
          this.deleteVisiable=false
          console.log(this.position)
          console.log(this.cap_list)
          this.map.remove(this.marker_now.target)
      },
      addmarker(){
          var marker = new AMap.Marker({
                        position: new AMap.LngLat(this.Lng,this.Lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                        icon: markerIcon,
                        offset: new AMap.Pixel(-30, -60),
                        title: 'CS-'+this.csNum.toString()+'  capacity = '+this.cap
            }); 
            marker.lng=this.Lng

            marker.lat=this.Lat
            var that=this
            marker.on('click', function(p){
                that.marker_now=p
                console.log("p:",p.lnglat.lat)
                that.deleteVisiable=true
            })
            this.map.add(marker)
      },
      changeArr(){
          if(this.csNumchange>=0)
        {
            this.arr1=["text-success"]
            this.csNumChangeString = '+'+this.csNumchange.toString()
        } 
        else 
        {
            this.arr1=["text-danger"]
            this.csNumChangeString = this.csNumchange.toString()
        }
        if(this.revenueChange>=0) 
        {
            this.arr2=["text-success"]
            this.rChangeString = '+'+this.revenueChange.toString()
        }
        else 
        {
            this.arr2=["text-danger"]
            this.rChangeString = this.revenueChange.toString()
        }
      },
      drawmap(){
        console.log(this.cap_list)
        console.log(this.position)
        console.log("cost",this.cost_list)
        var map = new AMap.Map('mapcontainer', {
            zoom:13,//级别
            center: this.center,//中心点坐标
            viewMode:'3D'
        });
        var path = [
            new AMap.LngLat(117.0955,31.868),
            new AMap.LngLat(117.2037804,31.868),
            new AMap.LngLat(117.2037804,31.79528498),
            new AMap.LngLat(117.0955,31.79528498),
            new AMap.LngLat(117.0955,31.868),
        ];

        var polyline = new AMap.Polyline({
            path: path,  
            borderWeight: 1, // 线条宽度，默认为 1
            strokeColor: 'red', // 线条颜色
            lineJoin: 'round' // 折线拐点连接处样式
        });

        map.add(polyline);

        this.map=map
        var that = this;
        map.on('click', function(e) {
                console.log('您在[ '+e.lnglat.getLng()+','+e.lnglat.getLat()+' ]的位置点击了地图！');
                that.Lng=e.lnglat.getLng()
                that.Lat=e.lnglat.getLat()
                if(that.Lng>117.2037804||that.Lng<117.0955||that.Lat>31.868||that.Lat<31.79528498)
                {
                    const h = that.$createElement;
                    that.$notify.error({
                        title: 'Adding Failed',
                        message: h('i', { style: 'color: teal'}, 'Not within the prescribed scope')
                    });
                    that.addflag = false
                }
                else if(that.addflag)
                {
                    
                    if(that.Lng>117.1611408){
                        if(that.Lat>31.83127909)
                             that.cost=65
                        else that.cost=20
                    } 
                    else if(that.Lat<31.8252856) that.cost=15
                    else if(that.Lng<117.1218491) that.cost=60
                    else if(that.Lat>31.84790359) that.cost=36
                    else that.cost=25
    
                    console.log("adding")
                    that.cap=''
                    that.Visiable=true
                }
            });
        for(var i=0;i<this.csNum;i++) {
            var marker = new AMap.Marker({
                        position: new AMap.LngLat(this.position[i][0],this.position[i][1]),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                        icon: markerIcon,
                        offset: new AMap.Pixel(-30, -60),
                        title: 'CS-'+(i+1).toString()+'  capacity = '+this.cap_list[i]
            }); 
            marker.lng=this.position[i][0]
            marker.lat=this.position[i][1]
            marker.on('click', function(p) {
                 that.marker_now=p
                 console.log("p:",p.lnglat.lat)
                 that.deleteVisiable=true
            })
            map.add(marker)
        }
      }
  },
  mounted() {
      this.changeArr()
      var that = this
      this.$axios.post('http://127.0.0.1:5000/get_all_cs'
            
            ).then(res=>{
                console.log(res.data)
                var length = res.data.length
                this.csNum = length
                this.revenue  = res.data.revenue
                this.last_csNum = length
                this.last_revenue = res.data.revenue
                for(var i=0;i<length;i++)
                {
                    this.cap_list.push(res.data.capacity[i])
                    this.position.push([res.data.lng[i],res.data.lat[i]])
                    this.cost_list.push(res.data.cost[i])
                }
                that.drawmap(); 
          })
  },
}

</script>

<style scoped src="../assets/css/material-dashboard.css">
</style>
