import store from '@/store'

class WebsocketClient {
  constructor (config = {}) {
    const defaultConfig = {
      url: '127.0.0.1',
      port: '12015',
      protocol: 'ws',
      timeInterval: 1000 * 5
    }
    const finalConfig = {
      ...defaultConfig,
      ...config
    }
    this.ws = {}
    this.url = finalConfig.url
    this.port = finalConfig.port
    this.protocol = finalConfig.protocol
    this.handle = null
    this.timeInterval = finalConfig.protocol
  }

  init () {
    this.ws = new WebSocket('ws://127.0.0.1:12015')
    this.ws.onopen = this.onOpen
    // 解决内部this指向socket this的问题
    this.ws.onmessage = (msg) => this.onMessage(msg)
    this.ws.onclose = () => this.onClose()
    this.ws.onerror = () => this.onError()
  }

  onOpen () {
    // 连接成功之后, 应该鉴权
    // 这个this指向了websocket的构造函数, 并不是这个class类, 天坑
    this.send(JSON.stringify({
      event: 'auth',
      message: 'Bearer ' + store.state.token
    }))
  }

  onMessage (event) {
    // 当用户未进入聊天室，则不接收消息
    // 接收服务端发送过来的消息
    console.log(event)
    const obj = JSON.parse(event.data)
    switch (obj.event) {
      case 'noAuth':
        // 鉴权失败
        // 路由跳转到 /login 重新获取token
        this.$router.push('/login')
        break
      case 'heartbeat':
        // this.checkServer()
        // 可以注释掉以下心跳状态，主动测试服务端是否会断开客户端的连接
        this.ws.send(JSON.stringify({
          event: 'heartbeat',
          message: 'pong'
        }))
        break
      default:
        // 分发mutations
        store.commit('setMessage', obj)
    }
  }

  onClose () {
    // 当链接主动断开的时候触发close事件
    console.log('close:' + this.ws.readyState)
    console.log('已关闭websocket')
    this.ws.close()
  }

  onError () {
    // 当连接失败时，触发error事件
    console.log('error:' + this.ws.readyState)
    console.log('websocket连接失败！')
    // 连接失败之后，1s进行断线重连！
    setTimeout(() => {
      this.init()
    }, 1000)
  }

  checkServer () {
    clearTimeout(this.handle)
    this.handle = setTimeout(() => {
      this.onClose()
      setTimeout(() => {
        this.init()
      }, 1000)
      // 设置1ms的时延，调试在服务器测未及时响应时，客户端的反应
    }, this.timeInterval)
  }
}

export default WebsocketClient
