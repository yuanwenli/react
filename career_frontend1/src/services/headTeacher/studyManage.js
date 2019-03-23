import { stringify } from 'qs';
import request from '@/utils/request';

// 我的课程列表
export async function getMyCourseList(params) {
  return request(`/course/Courseadmin/apiVideoList?${stringify(params)}`);
}

// 添加课程
export async function addMyCourse(params) {
  return request(`/course/Courseadmin/apiAddVideo?${stringify(params)}`);
}

// 删除课程
export async function delMyCourse(params) {
  return request(`/course/Courseadmin/apiDeleteVideo?${stringify(params)}`);
}
