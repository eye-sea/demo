import Vue from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload' //引入图片懒加载插件
import VueCookie from 'vue-cookie'     //引入cookie
import { Message } from 'element-ui'   //引入element-ui里的message(按需引入)
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

// 根据前端的跨域方式做调整 /a/b: /api/a/b => /a/b (代理)
axios.defaults.baseURL = '/api';  //基本路径
axios.defaults.timeout = 8000;   //请求超时
//接口错误拦截，第一个参数拦截请求成功后的业务错误，第二个参数拦截状态码错误
axios.interceptors.response.use(function(response) {
  let res = response.data;
  let path = location.hash;  //获取哈希路由
  if (res.status == 0) { //请求成功
    return res.data;
  } else if(res.status == 10) { //未登录
    // if(path != '#/index') {              //如果路由不是主页则
      window.location.href = '/#/login'  //跳转到登录页面
    // }
    return Promise.reject(res);
  } else {
    // alert(res.msg);
    Message.warning(res.msg);   //element-ui的方法
    return Promise.reject(res); //抛出异常
  }
},(error)=>{
  let res = error.response;
  Message.error(res.data.message);
  return Promise.reject(error);
})

Vue.use(VueAxios,axios)
Vue.use(VueCookie)
// Vue.component(Message.name, Message)  //使用Vue.use(Message)刷新页面会有一个无内容的弹框
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars.svg'
})
Vue.prototype.$message = Message  //把element-ui的Message插件挂到vue原型上，可以通过this.$message使用Message,不用每个组件都引入Message了
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
