import axios from 'axios'

class HTTPRequest {
  constructor (baseURL) {
    this.baseURL = baseURL
  }

  getInsideConfig () {
    const options = {
      baseURL: this.baseURL
    }
    return options
  }

  interceptors (instance) {
    // 添加请求拦截器
    instance.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      return config
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error)
    })

    // 添加响应拦截器
    instance.interceptors.response.use(function (response) {
      // 对响应数据做点什么
      return response.data
    }, function (error) {
      // 对响应错误做点什么
      return Promise.reject(error)
    })
  }

  request (options) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
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
