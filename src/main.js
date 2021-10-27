import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/index"

import "normalize.css";

import { Toast } from "mand-mobile";
//引用阿里矢量图标
import './assets/css/iconfont.css';

import './assets/css/site.css';
import F2 from "@antv/f2/lib/index-all";//'@antv/f2';




import _ from 'lodash'

Vue.prototype._ = _

Vue.prototype.F2 = F2;

Vue.prototype.$Toast = Toast;

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
