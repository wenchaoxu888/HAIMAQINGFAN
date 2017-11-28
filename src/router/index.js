import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import IndexBody from '@/components/indexbody/indexbody'
import DataStatistics from '@/components/datastatistics/datastatistics'
import ChannelPromition from '@/components/channelpromition/channelpromition'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/indexbody',
      name: 'IndexBody',
      component: IndexBody,
      children: [
        {
          path: '/indexbody/datastatistics',
          name: 'DataStatistics',
          component: DataStatistics
        },
        {
          path: '/indexbody/channelpromition',
          name: 'ChannelPromition',
          component: ChannelPromition
        },
        {
          path: '/indexbody',
          redirect: '/indexbody/datastatistics'
        }
      ]
    },
    {
      path: '*',
      redirect: '/indexbody'
    }
  ]
})
