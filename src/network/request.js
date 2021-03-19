import axios from 'axios'

export function request(config) {
  const instance1 = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 2000,
  })
  instance1.interceptors.request.use(
    config => {
      // console.log("拦截请求成功");
      return config
    },
    err => console.log(err)
  )
  instance1.interceptors.response.use(
    config => {
      // console.log("拦截响应成功");
      return config
    },
    err => console.log(err)
  )
  return instance1(config)
}
