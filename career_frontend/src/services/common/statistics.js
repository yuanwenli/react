import { stringify } from 'qs';
import request from '@/utils/request';

// 校管理员学分
export async function schoolScore() {
  return request(`/studentInfo/Classstatistics/apiClassScore`);
}

// 校管理员生涯兴趣
export async function schoolInterest() {
  return request(`/studentInfo/Classstatistics//apiClassLable`);
}

// 校管理员单个生涯兴趣
export async function signalInterest(params) {
  return request(`/studentInfo/Classstatistics//apiClassGradeLable?${stringify(params)}`);
}

// 校管理员生涯能力
export async function schoolAbility() {
  return request(`/studentInfo/Classstatistics/apiClassAbility`);
}
