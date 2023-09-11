import axios, { type AxiosRequestConfig } from 'axios'
import { showFailToast } from 'vant'
import router from '@/router'

const ajax = axios.create({
  timeout: 10000,
  baseURL: ''
})

// 请求拦截处理
ajax.interceptors.request.use(
  (config) => {
    const { data, params } = config
    console.log(config, `请求参数 =>`, data || params)
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

//响应拦截处理
ajax.interceptors.response.use(
  (response) => {
    const { data: respData, config } = response
    console.log(config, `请求结果 =>`, respData)
    if (!respData) {
      return Promise.reject('网络繁忙,请稍后再试')
    }
    const { data, msg, code } = respData
    if (code !== 0) {
      return Promise.reject(msg || '网络繁忙,请稍后再试')
    }
    return data
  },
  (error) => {
    console.log(error.config, '请求响应错误 => ', error)
    if (error && error.response) {
      const { status, data: respData } = error.response
      if (status === 401) {
        showFailToast('网络繁忙,请稍后再试')
        if (respData) {
          if (respData.code === 4001) {
            showFailToast('token无效, 请重新登陆')
            router.replace('/login')
          } else {
            showFailToast(respData.msg)
          }
        }
      } else if (respData && respData.msg) {
        showFailToast(respData.msg)
      }
    } else if (error && error.message) {
      showFailToast(error.message)
    } else {
      showFailToast('网络繁忙,请稍后再试')
    }
    return Promise.reject(error)
  }
)

function requestToken<T = any>(options: AxiosRequestConfig): Promise<T> {
  const token = window.localStorage.getItem('token') || ''
  const Authorization = 'Bearer ' + token
  return ajax<T>({
    ...options,
    headers: { Authorization: Authorization }
  }) as any
}

export default requestToken
