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
export const getPostList = (options) => axios.get(
  '/getPostList?' + qs.stringify(options))

// 温馨提醒
export const getTips = () => axios.get('/getTips')

// 本周热议
export const getTopWeek = () => axios.get('/getTopWeek')

// 友情链接
export const getLinks = () => axios.get('/getLinks')

// 用户签到
export const userSign = () => axios.get('/user/sign')

// 获取文章详情
export const getPostDetail = (id) => axios.get(`/getPostDetail?id=${id}`)

// 获取评论列表
export const getComments = ({
  id,
  page,
  pageSize
}) => axios.get(
  `/getComments`,
  {
    params: {
      id,
      page,
      pageSize
    }
  }
)

// 更新用户基本资料
export const updateUserInfo = (data) => axios.post('/user/basic', data)

// 发送更新用户名邮件
export const sendUpdateEmail = (updateUserName) => axios.get(
  '/user/sendUpdateEmail', {
    params: {
      updateUserName
    }
  })

// 确认更新用户名
export const updateUsername = (data) => axios.get('/user/updateUsername', {
  params: {
    key: data.key,
    username: data.username
  }
})

// 上传图片
export const uploadImg = (data) => axios.post('/uploadImg', data)

// 发贴接口
export const addPost = ({
  title,
  catalog,
  content,
  integral,
  code,
  sid
}) => axios.post('/add', {
  title,
  catalog,
  content,
  integral,
  code,
  sid
})

// 发贴接口
export const updatePost = ({
  title,
  catalog,
  content,
  integral,
  code,
  sid
}) => axios.post('/updatePost', {
  title,
  catalog,
  content,
  integral,
  code,
  sid
})

/**
 * 修改密码接口
 * @param oldPass 旧密码
 * @param newPass 新密码
 * @returns {AxiosPromise}
 */
export const resetPassword = ({
  oldPass,
  newPass
}) => axios.post('/user/resetPassword', {
  oldPass,
  newPass
})

// 发表评论
export const addComment = ({
  content,
  code,
  sid,
  tid
}) => axios.post('/addComment', {
  content,
  code,
  sid,
  tid
})

// 采纳
export const setCommentBest = ({
  cid,
  tid
}) => axios.get('/setCommentBest', {
  params: {
    cid,
    tid
  }
})

// 设置点赞
export const setLink = ({ cid }) => axios.get('/setLink', {
  params: {
    cid
  }
})

// 获取历史消息
export const getHistoryMsg = ({
  page,
  pageSize
}) => axios.get('/user/getHistoryMsg', {
  params: {
    page,
    pageSize
  }
})
