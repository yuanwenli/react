import { stringify } from 'qs';
import request from '@/utils/request';

// 登陆
export async function login(params) {
  return request(`/user/Login/apiUserLogin?${stringify(params)}`);
}

// 多账号登录
export async function typeLogin(params) {
  return request(`/index/Login/apiChoiceUserType?${stringify(params)}`);
}

// 获取用户信息
export async function getUserMessage() {
  return request('/user/Login/apiUserInfo');
}

// 验证用户ticket的
export async function getTicket(params) {
  return request(`/index/Login/index?${stringify(params)}`);
}

// 退出登录
export async function loginOut(params) {
  return request(`/index/Login/UserOff?${stringify(params)}`);
}
