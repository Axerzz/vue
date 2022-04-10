import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main.vue'
import Login from '@/components/login.vue'
import Register from '@/components/register.vue'
import HomeView from '@/view/HomeView.vue'
import CsInfo from '@/view/CsInfo.vue'
import Simulation from '@/view/Simulation.vue'

Vue.use(Router)

const router = new Router({
  routes:[
    {
      path: '/',
      component:Login
    },
    {
      path: '/login',
      component:Login
    },
    {
      path: '/register',
      component:Register
    },
    {
      path: '/main',
      component:Main,
      children:[
        {
          path: '/home',
          name: 'HomeView',
          component: HomeView
        },
        {
          path: '/csinfo',
          name: 'CsInfo',
          component: CsInfo
        },
        {
          path: '/simulation',
          name: 'Simulation',
          component: Simulation
        },
      ]
    }
  ]
});

export default router

