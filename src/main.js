import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/veeValidate'
import Alert from '@/components/modules/alert/index'
import Pop from '@/components/modules/pop/index'

Vue.use(Alert)
Vue.use(Pop)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
