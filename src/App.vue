<template>
  <el-container class="home-container">
    <!-- titlebar -->
    <!-- <el-aside width="300px">
        <AsideBar/>
    </el-aside>
    
    <el-container>
      <el-header>
         <HeaderBar/>
      </el-header>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container> -->
    <router-view></router-view>
  </el-container>

</template>

<script>
export default {
  name: 'App'
}
</script>
