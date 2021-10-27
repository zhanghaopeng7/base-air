/* eslint-disable */
// Config API文档 https://www.kancloud.cn/yunye/axios/234845
import { getHeaders, getUrlParameter } from './util'

import Qs from 'qs';

export const ERR_OK = 0

export const ERROR_SERVICE = 500

export const INVALID_TOKEN = 100002

let token = !!getUrlParameter()['token']?decodeURIComponent(getUrlParameter()['token']):''

let BASE_URL = ''

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://172.16.13.114:8081/mop'//'http://172.16.13.114:8081/mop'
} else if(process.env.NODE_ENV === 'mock'){
  BASE_URL ='http://mpos.fiytagroup.com:8900/mop'//mpos.fiytagroup.com:8900/mop   192.168.1.140:8900/mop
} else{
  BASE_URL = 'http://mop.fiyta.com/mop/' //http://mop.fiyta.com/mop/
}
export const BASE_API_URL = BASE_URL

let webapi = decodeURIComponent(getUrlParameter()['webapi'])
if (webapi && webapi !== 'undefined' && webapi !== null && webapi !== undefined) {
  console.log('set new api from url', webapi)
  BASE_URL = webapi
}

if(token) {
  window.sessionStorage.setItem('token', decodeURIComponent(token))
} else {
  token = (window.sessionStorage.getItem('token'))
}

//token='COMMCRED|351356e3-94c1-44b6-9719-a78899053668'

// POST请求配置文件
export function commonRequest (url, method, params, data , tm) {
  return {
    // `url` 是用于请求的服务器 URL
    url: url,
    // `method` 是创建请求时使用的方法
    method: method, // 默认是 get
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
    baseURL: BASE_URL,
    // `transformRequest` 允许在向服务器发送前，修改请求数据
    // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
    transformRequest: [function (data) {
      //对 data 进行任意转换处理
      //return data
      //return Qs.stringify(data)  //针对application/x-www-form-urlencoded 类型的请求
      return JSON.stringify(data)
    }],
    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [function (data) {
      // 对 data 进行任意转换处理
      if (typeof data === 'string') {
        return JSON.parse(data)
      } else {
        return data
      }
    }],
    headers: {'Accept': 'application/json;charset=UTF-8', 'Content-Type': 'application/json' ,'Token': token},//application/x-www-form-urlencoded
    // `params` 是即将与请求一起发送的 URL 参数
    // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
    params: Object.assign(getHeaders(), params),
    // `data` 是作为请求主体被发送的数据
    // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
    // 在没有设置 `transformRequest` 时，必须是以下类型之一：
    // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
    // - 浏览器专属：FormData, File, Blob
    // - Node 专属： Stream
    data: data,
    // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
    // 如果请求话费了超过 `timeout` 的时间，请求将被中断
    timeout: tm,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: false, // 默认的
    // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // 默认的
    // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
    xsrfCookieName: 'XSRF-TOKEN', // default
    // `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
    xsrfHeaderName: 'X-XSRF-TOKEN', // 默认的
    // `onUploadProgress` 允许为上传处理进度事件
    onUploadProgress: function (progressEvent) {
      // 对原生进度事件的处理
    },
    // `onDownloadProgress` 允许为下载处理进度事件
    onDownloadProgress: function (progressEvent) {
      // 对原生进度事件的处理
    },
    // `maxContentLength` 定义允许的响应内容的最大尺寸
    maxContentLength: 2000,
    // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
    validateStatus: function (status) {
      return status >= 200 && status < 300 // 默认的
    },
    // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
    // 如果设置为0，将不会 follow 任何重定向
    maxRedirects: 5 // 默认的
  }
}

// POST请求配置文件
export function postImg (url, method, params, data ,tm=60000) {
  return {
    // `url` 是用于请求的服务器 URL
    url: url,
    // `method` 是创建请求时使用的方法
    method: method, // 默认是 get
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
    baseURL: BASE_URL,
    // `transformRequest` 允许在向服务器发送前，修改请求数据
    // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
    transformRequest: [function (data) {
      //对 data 进行任意转换处理
      let form = new FormData();
      form.append("file", data.file);
      form.append("scene_type", data.scene_type);
      form.append("business_type", data.business_type);
      if(data.relation_no!=null && data.relation_no!=''){
        form.append("relation_no", data.relation_no);
      }
      return form
    }],
    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [function (data) {
      // 对 data 进行任意转换处理
      if (typeof data === 'string') {
        return JSON.parse(data)
      } else {
        return data
      }
    }],
    headers: {'Accept': 'application/json;charset=UTF-8', 'Content-Type': 'multipart/form-data' ,'Token': token},//application/x-www-form-urlencoded
    // `params` 是即将与请求一起发送的 URL 参数
    // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
    params: Object.assign(getHeaders(), params),
    // `data` 是作为请求主体被发送的数据
    // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
    // 在没有设置 `transformRequest` 时，必须是以下类型之一：
    // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
    // - 浏览器专属：FormData, File, Blob
    // - Node 专属： Stream
    data: data,
    // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
    // 如果请求话费了超过 `timeout` 的时间，请求将被中断
    timeout: tm,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: false, // 默认的
    // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // 默认的
    // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
    xsrfCookieName: 'XSRF-TOKEN', // default
    // `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
    xsrfHeaderName: 'X-XSRF-TOKEN', // 默认的
    // `onUploadProgress` 允许为上传处理进度事件
    onUploadProgress: function (progressEvent) {
      // 对原生进度事件的处理
    },
    // `onDownloadProgress` 允许为下载处理进度事件
    onDownloadProgress: function (progressEvent) {
      // 对原生进度事件的处理
    },
    // `maxContentLength` 定义允许的响应内容的最大尺寸
    maxContentLength: 2000,
    // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
    validateStatus: function (status) {
      return status >= 200 && status < 300 // 默认的
    },
    // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
    // 如果设置为0，将不会 follow 任何重定向
    maxRedirects: 5 // 默认的
  }
}
