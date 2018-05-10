// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
//路由
import router from './router';
//vuex
import store from './store';
//element
import ElementUi from 'element-ui';
//初始化浏览器样式
import './assets/css/reset.css';
//element样式
import 'element-ui/lib/theme-chalk/index.css';
//字体图标
import './assets/font/iconfont.css';
//全局样式
import './assets/css/common.css';
//组件覆盖样式
import './assets/css/cover.css';

Vue.config.productionTip = false
//引用 element, 设置组件大小为small
Vue.use(ElementUi,{ size: 'small' });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
