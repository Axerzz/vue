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
                <h4 class="mb-0">5</h4>
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
                <h4 class="mb-0">32167</h4>
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
                <h4 class="mb-0">90</h4>
              </div>
            </div>
            <div class="card-footer p-3">
            </div>
          </div>
        </div>
       </div>
      </div>
    <div style="height:25px"></div>
    <div id="container" style="width: 90%; height: 400px;border-radius:25px" >
  </div>
  </div>
</template>

<script>
import markerIcon from '../assets/img/marker.png';
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
      position: [[117.1741, 31.85143],
      [117.1153743, 31.85064675],
      [117.1341873, 31.83534871],
      [117.1153179, 31.81164271],
      [117.1759037, 31.82085063]],
      cstitle:["Charging Position 1",
                "Charging Position 2",
                "Charging Position 3",
                "Charging Position 4",
                "Charging Position 5"],
      cscap:[24, 20, 20, 28, 24],
      markerList: [],
      map:null
    };
  },
  methods: {
  },
  mounted() {
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
      this.markerList.push(marker);
      marker.on('click', function(p) {
                  var textContent = '<h5 style="color:orange">'+p.target.title+'</h5>'+
                                   '<ul>' +
                                  '<li>Capacity：' + p.target.capacity +  '</li>' + '<br/>' +
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
    }
    map.add(this.markerList)
    //this.center = "[117.1509645, 31.83057265]"
  },
}
</script>

<style scoped src="../assets/css/material-dashboard.css">
.mapborder {
      border:2px solid rgb(119, 107, 107);
      border-radius:15px;
}

</style> 