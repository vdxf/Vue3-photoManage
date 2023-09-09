import axios, { type AxiosRequestConfig } from 'axios'
import { showFailToast } from 'vant'

const ajax = axios.create({
  timeout: 10000,
  baseURL: ''
})

// 请求拦截处理
ajax.interceptors.request.use(
  (config) => {
    const { url, baseURL, data, params } = config
    console.log(`${url.startsWith('http') ? url : baseURL + url} 请求参数 =>`, data || params)
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
    const { url, baseURL } = config
    console.log(`${url.startsWith('http') ? url : baseURL + url} 请求结果 =>`, respData)
    const { data } = respData
    return data
  },
  (error) => {
    console.log('请求响应错误 => ', error.response, error)
    if (error.message) {
      showFailToast('网络繁忙')
    } else {
      showFailToast(error.response.data.msg || (error.response.status && error.response.statusText))
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
