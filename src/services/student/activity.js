import { stringify } from 'qs';
import request from '@/utils/request';

// 我的生涯活动记录
export async function getMyActivityList(params) {
  return request(`/activity/Studentactivitys/apiStudentactivityList?${stringify(params)}`);
}
// 发表生涯动态
export async function addActivity(params) {
  return request('/activity/Studentactivitys/apiAddStudentactivity', {
    method: 'POST',
    body: params,
  })
}

// 单条查询生涯动态
export async function getSignalActivity(params) {
  return request(`/activity/Studentactivitys/apiFindStudentactivity?${stringify(params)}`);
}

// 编辑生涯动态
export async function editActivity(params) {
  return request('/activity/Studentactivitys/apiUpdateStudentactivity', {
    method: 'POST',
    body: params,
  })
}
// 删除生涯动态
export async function delActivity(params) {
  return request(`/activity/Studentactivitys/apiDeleteStudentactivity?${stringify(params)}`);
}

// 班级生涯活动列表
export async function getClassActivity(params) {
  return request(`/activity/Classesactivaity/apiClassActivityList?${stringify(params)}`);
}

// 班级生涯活动详情
export async function getClassActivityDetail(params) {
  return request(`/activity/Classesactivaity/apiFindStudentActivity?${stringify(params)}`);
}

// 参与活动
export async function joinActivity(params) {
  return request('/activity/Classesactivaity/apiJoinClassActivity', {
    method: 'POST',
    body: params,
  })
}

// 班级生涯动态（类似朋友圈）
export async function classStudentActivity(params) {
  return request(`/activity/Studentactivitys/apiClassStudentactivity?${stringify(params)}`);
}
