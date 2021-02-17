import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/veeValidate'
import Alert from '@/components/modules/alert/index'
import Pop from '@/components/modules/pop/index'
import moment from 'moment'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

window.moment = moment
Vue.use(ElementUI)
Vue.use(Alert)
Vue.use(Pop)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
