import axios from '@/utils/request'

export const getCaptcha = (sid) => axios.get(`/getCaptcha`, {
  params: {
    sid
  }
})

// export const forget = ({ username }) => axios.post(`/forget`, {
//   username
// })

export function forget (username) {
  return axios.post(`/forget`, {
    username
  })
}

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

console.log(axios)
