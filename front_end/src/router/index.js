import Vue from 'vue'
import Router from 'vue-router'
//路由懒加载
const Login  = resolve => require(['@/views/login/login'], resolve);
const Index  = resolve => require(['@/views/index/index'], resolve);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
  ]
})
