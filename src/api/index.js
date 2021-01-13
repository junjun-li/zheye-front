import axios from '@/utils/request'

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

console.log(axios)
