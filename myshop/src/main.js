import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import './assets/font/iconfont.css'

//引入axios
import axios from "axios";
Vue.prototype.$axios = axios;
//配置默认url
// axios.defaults.baseURL = 'http://127.0.0.1:3000';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//引入echarts
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
