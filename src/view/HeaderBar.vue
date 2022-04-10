<template>
    <nav class="navbar navbar-main navbar-expand-lg px-0 mx-0 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
        <div class="container-fluid py-1 px-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
              <li class="breadcrumb-item text-sm"><a class="opacity-5 text-dark" href="javascript:;">Pages</a></li>
              <li class="breadcrumb-item text-sm text-dark active" aria-current="page">{{PageName}}</li>
            </ol>
            <h6 class="font-weight-bolder mb-0">{{PageName}}</h6>
          </nav>
        </div>
        <el-button type="info" @click="exit" round plain>Exit</el-button>
      </nav>
</template>

<script>
export default {
  name: 'HeaderBar',
  data(){
      return{
          PageName:''
      }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
      fetchData(){
        var list = this.$route.path
        if(list=='/home') this.PageName="HomePage"
        if(list=='/simulation') this.PageName='Simulation'
        if(list=='/csinfo') this.PageName='CS info'
      },
      exit(){
        this.$router.push('/login')
      }
    
  },
  mounted() {
        var list = this.$route.path
        if(list=='/home') this.PageName="HomePage"
        if(list=='/simulation') this.PageName='Simulation'
        if(list=='/csinfo') this.PageName='CS info'
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="../assets/css/material-dashboard.css">

</style>
