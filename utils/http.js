import axios from 'axios'
import { helpers } from '@/utils/helpers'

class Http {
  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    console.log('backend base url:', this.baseUrl)
  }

  // 通用请求方法
  request(options) {
    const instance = axios.create({
      baseURL: this.baseUrl,
      withCredentials: true,
      headers: {},
    })

    // 根据 Content-Type 配置请求头
    if (options.json === true) {
      instance.defaults.headers.post['Content-Type'] = 'application/json'
      instance.defaults.headers.put['Content-Type'] = 'application/json'
    } else if (options.file === true) {
      instance.defaults.headers.post['Content-Type'] = 'multipart/form-data'
    } else {
      instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    // token 优先级：options.token > localStorage.token
    const token = options.token || localStorage.getItem('token')
    if (token) {
      instance.defaults.headers.pofatoken = token
    }

    // 上传进度回调
    if (options.onUploadProgress) {
      instance.defaults.onUploadProgress = options.onUploadProgress
    }

    // 请求体预处理（表单/json/formdata）
    instance.defaults.transformRequest = [data => this._transformRequest(data, options)]

    // 请求拦截器（可扩展）
    instance.interceptors.request.use(config => config, error => Promise.reject(error))

    // 响应拦截器
    instance.interceptors.response.use(
      res => {
        // const { data, status } = res
        console.log(res.data)
        if (!res.data || res.status !== 200) {
          this._errorHandle(data, data.code)
          return Promise.reject(data)
        }
        return res // 直接返回业务数据
      },
      error => {
        const response = error.response
        const status = response ? response.status : 500
        const msg = response ? response.data : '服务器无响应'
        this._errorHandle(msg, status)
        return Promise.reject(error)
      }
    )

    // 默认请求方式为 GET
    options.method = options.method || 'get'

    return instance(options)
  }

  // 请求体预处理
  _transformRequest(data, options) {
    if (options.file) return data

    const contentType = options.headers?.['Content-Type']
    if (contentType) return data

    if (options.json === true && typeof data !== 'string') {
      return JSON.stringify(data)
    }

    return helpers.queryStringify(data) // 表单格式转 URL 查询串
  }

  // 错误处理（UI 交由组件完成）
  _errorHandle(data, code) {
    console.error('请求异常:', { code, data })
  }

  // 简化请求方法封装
  get(url, params = {}, config = {}) {
    return this.request({
      method: 'get',
      url,
      params,
      ...config,
    })
  }

  post(url, data = {}, config = {}) {
    return this.request({
      method: 'post',
      url,
      data,
      ...config,
    })
  }

  put(url, data = {}, config = {}) {
    return this.request({
      method: 'put',
      url,
      data,
      ...config,
    })
  }

  delete(url, params = {}, config = {}) {
    return this.request({
      method: 'delete',
      url,
      params,
      ...config,
    })
  }
}

const http = new Http();
export default http;
