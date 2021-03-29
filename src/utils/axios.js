import axios from 'axios'
import router from '@/router'
window.router = router
const CancelToken = axios.CancelToken

class HTTPRequest {
  constructor (baseURL) {
    this.baseURL = baseURL
    this.pending = {}
  }

  getInsideConfig () {
    return {
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000
    }
  }

  removePending (key, isRequest = false) {
    if (this.pending[key] && isRequest) {
      this.pending[key]('取消重复请求')
    }
    delete this.pending[key]
  }

  interceptors (instance) {
    // 添加请求拦截器
    instance.interceptors.request.use((config) => {
      // 在发送请求之前做些什么
      const key = config.url + '&' + config.method
      const token = localStorage.getItem('token')
      this.removePending(key, true)
      config.cancelToken = new CancelToken((c) => {
        // executor 函数接收一个 cancel 函数作为参数
        this.pending[key] = c
      })
      if (token) {
        config.headers.Authorization = 'Bearer ' + token
      } 
      // else {
      //   router.push('/login')
      // }
      return config
    }, (err) => {
      // 对请求错误做些什么
      return Promise.reject(err)
    })

    // 添加响应拦截器
    instance.interceptors.response.use((res) => {
      // 对响应数据做点什么
      const key = res.config.url + '&' + res.config.method
      this.removePending(key)
      if (res.status === 200) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(res)
      }
    }, (err) => {
      // 对响应错误做点什么
      return Promise.reject(err)
    })
  }

  request (options) {
    // 1. 创建axios实例
    const instance = axios.create()
    // 2. 把默认的axios配置, 混入在一起
    const newOptions = Object.assign(this.getInsideConfig(), options)
    // 3. 给axios添加请求拦截器和响应拦截器
    this.interceptors(instance)
    // 4. 导出实例
    return instance(newOptions)
  }

  get (url, config) {
    const options = Object.assign({
      method: 'get',
      url
    }, config)
    return this.request(options)
  }

  post (url, data) {
    return this.request({
      method: 'post',
      url,
      data
    })
  }
}

export default HTTPRequest
