import { stringify } from 'qs';
import request from '@/utils/request';

// 在线学习课程列表
export async function getCourseList(params) {
  return request(`?${stringify(params)}`);
}

// 课程详情
export async function getCourseDetail(params) {
  return request(`?${stringify(params)}`);
}
