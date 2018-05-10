import request from '../lib/request';

/** 
 * 登陆页面
 */
export const loginPage = {
  //登陆
  login: param => request.post('/login', param)
  //
};
/** 
 * 顶部菜单栏
 */
export const indexPage = {
  getMenuList: () => request.get('/getMenu'),
};
