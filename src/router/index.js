import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = () => import(/* webpackChunkName: 'login' */ '@/views/Login')
const Reg = () => import(/* webpackChunkName: 'reg' */ '@/views/Reg')
const Forget = () => import(/* webpackChunkName: 'forget' */ '@/views/Forget')
const Home = () => import(/* webpackChunkName: 'forget' */ '@/views/Home')
const Index = () => import(/* webpackChunkName: 'index' */ '@/views/channels/Index')
const Template1 = () => import(/* webpackChunkName: 'template1' */ '@/views/channels/Template1')
export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'index',
          component: Index
        },
        {
          path: '/index/:catalog',
          name: 'catalog',
          component: Template1
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg,
      // login页面才能拿到sid 防止没有sid
      beforeEnter: (to, from, next) => {
        if (from.name === 'login') {
          next()
        } else {
          next('/login')
        }
      }
    }
  ]
})
