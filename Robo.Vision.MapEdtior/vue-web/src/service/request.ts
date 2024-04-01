import axios from 'axios'

// 基础信息
const BASE_URL = import.meta.env.VITE_BASE_URL
const TOKEN = 'token'

// 创建一个独立的axios实例
const request = axios.create({
  // 设置baseUr地址,如果通过proxy跨域可直接填写base地址
  baseURL: BASE_URL,
  // 定义统一的请求头部
  headers: {},
  // 配置请求超时时间
  timeout: 10000
})
// 请求拦截
request.interceptors.request.use((config: any) => {
  // 自定义header，可添加项目token
  config.headers.token = TOKEN
  return config
})
// 返回拦截
request.interceptors.response.use(
  (response: any) => {
    // 获取接口返回结果
    const res: any = response.data
    // code为0，直接把结果返回回去，这样前端代码就不用在获取一次data.
    if (res.code === 200) {
      return res
    } else {
      // 错误显示可在request中控制，因为某些场景我们不想要展示错误
      return res
    }
  },
  () => {
    new Error('网络请求异常，请稍后重试!')
  }
)
export default request
