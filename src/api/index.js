import {commonRequest, ERR_OK, INVALID_TOKEN} from './config'
// import {postFile, commonRequest, ERR_OK, ERROR_SERVICE, INVALID_TOKEN, ERR_MSG, LOG_OUT} from './config'
import axios from 'axios'
import Vue from 'vue'

// POST/GET/PUT/DELETE 请求
function Request (url, method, params, data, visible = true, tm = 60000, errcb) {
  if (visible) {
    document.getElementById("iloading").className='iloading';
    //添加加载动画
  }
  //Vue.prototype.$Toast.loading('载入中')
  return new Promise(function (resolve, reject) {
    axios(commonRequest(url, method, params, data, tm)).then((res) => {
      //关闭加载动画
      document.getElementById("iloading").className='hidden';
      if (res.data.code === 200) {
        resolve(res.data)
      } else if (errcb) {
        resolve(res.data)
      } else {
        //抛出错误res.data.message
        resolve(res.data)
      }
    }).catch(err => {
      //Vue.prototype.$Toast.hide()
      //Vue.prototype.$Toast.failed(err)
      Vue.prototype.$Toast.failed('index 出错')
      // Vue.prototype.$loading.close()
      //关闭加载动画，请求超时
      //document.getElementById("iloading").className='hidden';
      //Vue.prototype.$toast.error({ time: 10000,message:'当前网络不好，请求超时!请稍后尝试'})
      reject(err)
    })
  })
}

// 接口

/**
 * 接口示例
 * @param data
 * @constructor
 */
//查询用户基础信息
export const GET_USER_INFO = (data) => Request('/user/getUserInfo', 'post', null, data, true)
