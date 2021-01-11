import AlertComponent from './Alert.vue'

const Alert = {}

Alert.install = (Vue) => {
  // 把alert组件绑定到全局的vue实例上面去
  const AlertConstructor = Vue.extend(AlertComponent)
  // 实例化组件alert
  const instance = new AlertConstructor()
  // 绑定到一个div上面
  instance.$mount(document.createElement('div'))
  // 把这个组件动态的添加到上面去
  document.body.appendChild(instance.$el)

  Vue.prototype.$alert = (msg, success) => {
    // 逻辑...
    instance.msg = msg
    instance.isShow = true
    instance.type = 'alert'
    if (typeof success !== 'undefined') {
      instance.success = success
    }
  }
  Vue.prototype.$confirm = (msg, success, cancel) => {
    // 逻辑...
    instance.msg = msg
    instance.isShow = true
    instance.type = 'confirm'
    if (typeof success !== 'undefined') {
      instance.success = success
    }
    if (typeof cancel !== 'undefined') {
      instance.cancel = cancel
    }
  }
}

export default Alert
