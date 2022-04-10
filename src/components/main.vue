<template>
  <el-container class="home-container">
    <!-- titlebar -->
    <el-aside width="300px">
        <AsideBar/>
    </el-aside>
    <el-container>
      <el-header>
         <HeaderBar/>
      </el-header>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>
    

<script>
import AsideBar from "@/view/AsideBar";
import HeaderBar from "@/view/HeaderBar"
export default {
  name: 'Main',
  components: {
     AsideBar,
     HeaderBar
  }
}
</script>