<template>
    <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
      <div class="sidenav-header">
        <i class="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
        <router-link to="/home" class="navbar-brand m-0">
          <img src="../assets/img/logo-ct.png" class="navbar-brand-img h-100" alt="main_logo">
          <span class="ms-1 font-weight-bold text-white">City Charging Simulation</span>
        </router-link>
      </div>
      <hr class="horizontal light mt-0 mb-2">
      <div class="collapse navbar-collapse  w-auto  max-height-vh-100" id="sidenav-collapse-main">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/home" @click.native="change1" :class="arr1">
              <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i class="material-icons opacity-10">dashboard</i>
              </div>
              <span class="nav-link-text ms-1">Homepage</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/simulation" @click.native="change2" :class="arr2">
              <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i class="material-icons opacity-10">table_view</i>
              </div>
              <span  class="nav-link-text ms-1 ">Simulation</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/csinfo" @click.native="change3" :class="arr3">
              <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i class="material-icons opacity-10">receipt_long</i>
              </div>
              <span class="nav-link-text ms-1">CS info</span>
            </router-link>
          </li>
        </ul>
      </div>
    </aside>
</template>

<script>
export default {
  name: 'AsideBar',
  data(){
    return{
      arr1:["nav-link", "text-white","active","bg-gradient-primary"],
      arr2:["nav-link", "text-white"],
      arr3:["nav-link", "text-white"]
    }
  },
  methods:
  {
    change2(){
      this.arr2 =["nav-link", "text-white","active","bg-gradient-primary"],
      this.arr1 =["nav-link", "text-white"],
      this.arr3 = ["nav-link", "text-white"]
    },
    change1(){
      this.arr1 =["nav-link", "text-white","active","bg-gradient-primary"],
      this.arr2 =["nav-link", "text-white"],
      this.arr3 = ["nav-link", "text-white"]
    },
    change3(){
      this.arr3 =["nav-link", "text-white","active","bg-gradient-primary"],
      this.arr1 =["nav-link", "text-white"],
      this.arr2 = ["nav-link", "text-white"]
    }
  },
  mounted() {
        var list = this.$route.path
        if(list=='/home') this.change1()
        if(list=='/simulation') this.change2()
        if(list=='/csinfo') this.change3()
    }
}
</script>

<style scoped src="../assets/css/material-dashboard.css">

</style>