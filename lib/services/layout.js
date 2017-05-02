import request from '../../request';
import { login } from '../../utils'

export async function queryAllSystems() {
  return request(`/p/passport/v1/api/get_systems?userid=${window.$user.id}`);
}
/**
 * 获取登录的用户信息
 * @returns {Object}
 */
export async function queryUserInfo() {
  return request('/p/passport/v1/api/get_user_info')
    .catch((err) => {
      login()
    });
}
/**
 * 获取系统的导航条
 * @returns {Object}
 */
export async function queryMenu() {
  return request(`/p/passport/v1/api/get_sys_all_menu?syscode=${window.$config.sysCode}&userid=${window.$user.id}`);
}

