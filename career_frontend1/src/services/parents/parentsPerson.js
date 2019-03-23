import { stringify } from 'qs';
import request from '@/utils/request';

// 获取个人信息
export async function getPerson(params) {
  return request(`${stringify(parmas)}`);
}

// 更改手机号码
export async function changePhone(params) {
  return request('', {
    method: 'POST',
    body: params,
  })
}
