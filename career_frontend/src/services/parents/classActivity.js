import { stringify } from 'qs';
import request from '@/utils/request';

// 班级生涯活动列表
export async function getClassActivityList(params) {
  return request(`?${stringify(params)}`);
}

// 班级生涯活动详情
export async function getClassActivityDetail(params) {
  return request(`?${stringify(params)}`);
}
