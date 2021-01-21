import axios from '@/utils/request'
import qs from 'qs'

export const getCaptcha = (sid) => axios.get(`/getCaptcha`, {
  params: {
    sid
  }
})

export const forget = ({ username }) => axios.post(`/forget`, {
  username
})

export const login = ({
  username,
  code,
  password,
  sid
}) => axios.post(`/login`, {
  username,
  password,
  code,
  sid
})

export const reg = ({
  username,
  name,
  password,
  code,
  sid
}) => axios.post(`/reg`, {
  username,
  name,
  password,
  code,
  sid
})

/**
 * 读取文章列表
 * @param {Object} options 读取文章列表接口参数
 */
export const getList = (options) => axios.get('/public/list?' + qs.stringify(options))

// 温馨提醒
export const getTips = () => axios.get('/public/tips')

// 本周热议
export const getTop = () => axios.get('/public/topWeek')

// 友情链接
export const getLinks = () => axios.get('/public/links')
