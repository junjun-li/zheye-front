import axios from '@/utils/request'

export const getCaptcha = () => axios.get(`/getCaptcha`)

export const forget = ({ username }) => axios.post(`/forget`, {
  username
})
