import { stringify } from 'qs';
import request from '@/utils/request';

// 班级生涯活动列表
export async function getClassActivityList(params) {
  return request(`/activity/Classesactivaity/apiSelectClassActivity?${stringify(params)}`);
}

// 添加生涯活动
export async function addClassActivity(params) {
  return request('/activity/Classesactivaity/apiAddClassActivity', {
    method: 'POST',
    body: params,
  })
}

// 修改班级活动
export async function editActivity(params) {
  return request('/activity/Classesactivaity/apiEditClassActivity', {
    method: 'POST',
    body: params,
  })
}

// 删除班级活动
export async function delActivity(params) {
  return request(`/activity/Classesactivaity/apiDeleteClassActivity?${stringify(params)}`);
}

// 单个查询班级活动
export async function getSignalActivity(params) {
  return request(`/activity/Classesactivaity/apiFindClassActivity?${stringify(params)}`)
}

// 开启关闭活动
export async function openActivity(params) {
  return request(`/activity/Classesactivaity/apiOpenClassActivity?${stringify(params)}`);
}
//发送活动通知
export async function sendActivityNotice(params) {
  return request(`/activity/Classesactivaity/apiOpenClassActivity?${stringify(params)}`);
}