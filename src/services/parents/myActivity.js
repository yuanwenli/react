import { stringify } from 'qs';
import request from '@/utils/request';

// 我的生涯活动记录
export async function getMyActivityList(params) {
  return request(`?${stringify(params)}`);
}
// 发表生涯活动
export async function addActivity(params) {
  return request({
    method: 'POST',
    body: params,
  })
}
// 编辑生涯活动
export async function editActivity(params) {
  return request({
    method: 'POST',
    body: params,
  })
}
// 删除生涯活动
export async function delActivity(params) {
  return request('', {
    method: 'DELETE',
    body: params
  })
}
// 班级生涯活动
export async function getClassActivity(params) {
  return request(`?${stringify(params)}`);
}
// 班级生涯活动详情
export async function getClassActivityDetail(params) {
  return request(`?${stringify(params)}`);
}

