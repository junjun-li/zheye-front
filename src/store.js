import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development'
  ? config.baseUrl.dev
  : config.baseUrl.pro
Vue.use(Vuex)

export default new Vuex.Store({
  // 生产环境 禁用严格模式 严格模式有性消耗
  strict: process.env.NODE_ENV !== 'production',
  state: {
    sid: '',
    isLogin: false,
    token: '',
    userInfo: {}
  },
  mutations: {
    setSid (state, value) {
      state.sid = value
    },
    setToken (state, value) {
      state.token = value
      localStorage.setItem('token', value)
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      if (userInfo !== '') {
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
      }
    },
    // 设置用户头像
    setUserPic (state, pic) {
      state.userInfo = {
        ...state.userInfo,
        pic
      }
      if (pic !== '') {
        localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
      }
    },
    // 设置isLogin的状态
    setIsLogin (state, value) {
      state.isLogin = value
    }
  },
  actions: {},
  getters: {
    count: state => state.userInfo && state.userInfo.count
      ? state.userInfo.count
      : 0,
    pic: state => state.userInfo && state.userInfo.pic !== ''
      ? baseUrl + state.userInfo.pic
      : '/img/bear-200-200.jpg'
  },
  modules: {},
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : []
})
