import { stringify } from 'qs';
import request from '@/utils/request';

// 学生信息
export async function getStudentMessage(params) {
  return request(`?${stringify(params)}`);
}

// 家族树
export async function getFamily(params) {
  return request(`?${stringify(params)}`);
}
