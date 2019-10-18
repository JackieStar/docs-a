## 请求类封装

## axios拦截器封装
首先在plugin文件夹中添加 axios.js

```js
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import util from '@/libs/util'

// 创建一个错误
function errorCreate (msg) {
  const error = new Error(msg)
  errorLog(error)
  throw error
}

// 记录和显示错误
function errorLog (error) {
  // 添加到日志
  store.dispatch('sgaAdmin/log/push', {
    message: '数据请求异常',
    type: 'danger',
    meta: {
      error
    }
  })
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.danger('>>>>>> Error >>>>>>')
    console.log(error)
  }
  // 显示提示
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
}
console.log(process.env.VUE_API_LOGIN)
// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    const token = util.cookies.get('token')
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers.Authorization = token
    return config
  },
  error => {
    // 发送失败
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    const { code } = dataAxios
    // 根据 code 进行判断
    if (code === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口
      return dataAxios
    } else {
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (code) {
        case 0:
          // [ 示例 ] code === 0 代表没有错误
          return dataAxios.data
        case 'xxx':
          // [ 示例 ] 其它和后台约定的 code
          errorCreate(`[ code: xxx ] ${dataAxios.msg}: ${response.config.url}`)
          break
        default:
          // 不是正确的 code
          errorCreate(`${dataAxios.msg}: ${response.config.url}`)
          break
      }
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未授权，请登录'; break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

export default http

```

## restful api 化
在utils文件添加 http.js

```js
import axios from '@/plugin/axios'

export default {

    get(url, params) { return axios({ method: 'get', url, params }) },

    post(url, params) { return axios({ method: 'post', url, data: params }) },

    put(url, params) { return axios({ method: 'put', url, data: params }) },

    delete(url) { return axios({ method: 'delete', url}) }

}
```



## api文件中统一管理
modules中添加
demo.js
```js
import http from '@/utils/request'
const baseUrl = '/api/'

export default {
    // 查询
    getXxx() { return http.get(`${baseUrl}xxx`) },
    // 增
    postXxx() { return http.post(`${baseUrl}xxx`) },
    // 更新
    putXxx() { return http.put(`${baseUrl}xxx`) },
    deleteXxx() { return http.delete(`${baseUrl}xxx`) }
}
```
index.js 添加自动化序列api文件的配置
```js
import http from '@/utils/http'

const files = require.context('./modules', false, /\.js$/)
let modules = []

files.keys().forEach(key => {
    modules.push(files(key).default)
})

const api = Object.assign({}, http, ...modules)

export default api
```

## 全局api化
main.js 全局挂载api
```js
// restful封装
import api from '@/api/index'
Vue.prototype.$api = api
```

## 调用

```js
async getDemo () {
    const params = {}
    const res = await this.$api.getXxx(params)
    console.log(res)
}
```

