import PopComponent from './pop'

const Pop = {}

Pop.install = (Vue) => {
  // 1. 把pop组件绑定到全局的vue实例上面去
  const PopConstructor = Vue.extend(PopComponent)
  // 实例化组件pop
  const instance = new PopConstructor()
  // 绑定到div上面
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)

  Vue.prototype.$pop = (type, msg) => {
    instance.type = type
    instance.msg = msg
    instance.isShow = true
  }
}

export default Pop
