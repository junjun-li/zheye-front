import Vue from 'vue'
import Router from 'vue-router'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import store from '@/store'

Vue.use(Router)

const Login = () => import(/* webpackChunkName: 'login' */ '@/views/Login')
const Reg = () => import(/* webpackChunkName: 'reg' */ '@/views/Reg')
const Forget = () => import(/* webpackChunkName: 'forget' */ '@/views/Forget')
const Home = () => import(/* webpackChunkName: 'forget' */ '@/views/Home')
const Index = () => import(/* webpackChunkName: 'index' */ '@/views/channels/Index')
const Template1 = () => import(/* webpackChunkName: 'template1' */ '@/views/channels/Template1')
const Center = () => import(/* webpackChunkName: 'center' */ '@/views/Center.vue')
const UserCenter = () => import(/* webpackChunkName: 'user-center' */ '@/components/user/Center.vue')

const MyInfo = () => import(/* webpackChunkName: 'info' */ '@/components/user/common/MyInfo.vue')
const PicUpload = () => import(/* webpackChunkName: 'uploadpic' */ '@/components/user/common/PicUpload.vue')
const Passwd = () => import(/* webpackChunkName: 'password' */ '@/components/user/common/Passwd.vue')
const Accounts = () => import(/* webpackChunkName: 'accounts' */ '@/components/user/common/Accounts.vue')
const MyPost = () => import(/* webpackChunkName: 'mypost' */ '@/components/user/common/MyPost.vue')
const MyCollection = () => import(/* webpackChunkName: 'mycollection' */ '@/components/user/common/MyCollection.vue')
const MyEmail = () => import(/* webpackChunkName: 'mycollection' */ '@/components/user/common/MyEmail.vue')
const Posts = () => import(/* webpackChunkName: 'user-post' */ '@/components/user/Posts.vue')
const Msg = () => import(/* webpackChunkName: 'user-msg' */ '@/components/user/Msg.vue')
const Others = () => import(/* webpackChunkName: 'othres' */ '@/components/user/Others.vue')
const Settings = () => import(/* webpackChunkName: 'settings' */ '@/components/user/Settings.vue')
const NoFound = () => import(/* webpackChunkName: 'notfound' */ '@/views/NotFound.vue')
const Confirm = () => import(/* webpackChunkName: 'confirm' */ '@/views/Confirm.vue')
const Add = () => import(/* webpackChunkName: 'add' */ '@/components/contents/Add')
const Detail = () => import(/* webpackChunkName: 'detail' */ '@/components/contents/Detail')

const router = new Router({
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
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/add',
      name: 'add',
      component: Add
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
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget
    },
    {
      path: '/center',
      component: Center,
      meta: {
        requiresAuth: true // 这个路由需要校验是否登录
      },
      linkActiveClass: 'layui-this',
      children: [
        {
          path: 'index',
          name: 'center',
          component: UserCenter
        },
        {
          path: 'set',
          component: Settings,
          // redirect: '/center/set/index',
          children: [
            {
              path: '',
              name: 'info',
              component: MyInfo
            },
            {
              path: 'pic',
              name: 'pic',
              component: PicUpload
            },
            {
              path: 'passwd',
              name: 'passwd',
              component: Passwd
            },
            {
              path: 'account',
              name: 'account',
              component: Accounts
            },
            {
              path: 'email',
              name: 'email',
              component: MyEmail
            }
          ]
        },
        {
          path: 'posts',
          component: Posts,
          children: [
            {
              path: '',
              name: 'mypost',
              component: MyPost
            },
            {
              path: 'mycollection',
              name: 'mycollection',
              component: MyCollection
            }
          ]
        },
        {
          path: 'msg',
          name: 'msg',
          component: Msg
        },
        {
          path: 'others',
          name: 'others',
          component: Others
        }
      ]
      // beforeEnter:
    },
    {
      path: '/confirm',
      component: Confirm
    },
    {
      path: '/404',
      component: NoFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 1.每次进入到路由之前,判断是否有数据, 有数据直接设置
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (token !== '' && token !== null) {
    // 可以把token解析出来,查看他的创建时间和过期时间
    const payload = jwt.decode(token)
    // console.log(moment().isBefore(moment(payload.exp * 1000)))
    // console.log(payload)
    // 判断token是否过期呀 如果过期了,删除掉缓存的数据
    if (moment().isBefore(moment(payload.exp * 1000))) {
      // 刷新了页面 要从新获取 保持状态登录
      store.commit('setToken', token)
      store.commit('setUserInfo', userInfo)
      store.commit('setIsLogin', true)
    } else {
      // 如果token过期了, 直接删除localhost里面的数据就好了
      localStorage.clear()
    }
  }
  // 2.判断路由是否需要登录才能查看
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 需要登录才能查看, 判断是否登录了
    const isLogin = store.state.isLogin
    if (isLogin) {
      next()
    } else {
      next('/login')
    }
  } else {
    // 不需要登录就可以看 直接next
    next()
  }
})

export default router
