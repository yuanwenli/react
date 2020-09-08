import { stringify } from 'qs';
import request from '@/utils/request';

// 家族树列表
export async function getFamilyList(params) {
  return request(`/studentInfo/Family/apiSelectFamily?${stringify(params)}`);
}

// 编辑
export async function editFamily(params) {
  return request('/studentInfo/Family/apiUpdateFamily', {
    method: 'POST',
    body: params,
  })
}

// 删除
export async function delFamily(params) {
  return request(`/studentInfo/Family/apiDeleteFamily?${stringify(params)}`);
}

// 添加
export async function addFamily(params) {
  return request('/studentInfo/Family/apiAddFamily', {
    method: 'POST',
    body: params,
  })
}

export async function getSignalFamily(params) {
  return request(`/studentInfo/Family/apiFindFamily?${stringify(params)}`);
}
