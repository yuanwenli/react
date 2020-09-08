import { stringify } from 'qs';
import request from '@/utils/request';

// 课程列表
export async function getCourseList(params) {
  return request(`/course/Courseindex/apiSelectVideoList?${stringify(params)}`);
}

// 课程详情
export async function getCourseDetail(params) {
  return request(`/course/Courseindex/apiFindVideo?${stringify(params)}`);
}
