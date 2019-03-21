import { stringify } from 'qs';
import request from '@/utils/request';

// 完成情况
export async function getCompletion(params) {
  return request(`${stringify(params)}`);
}

// 查看问卷
export async function getDetail(params) {
  return request(`${stringify(params)}`);
}

export async function closeQuestionnaire(params) {
  return request(`${stringify(params)}`);
}

// 基本信息
export async function basicMessage(params) {
  return request('', {
    method: 'POST',
    body: params,
  })
}

// 预览问卷
export async function preview(params) {
  return request(`${stringify(params)}`);
}

// 删除问卷
export async function delQuestionnaire(params) {
  return request('', {
    method: 'POST',
    body: params,
  })
}

// 保存问卷
export async function saveQuestionnaire(params) {
  return request('', {
    method: 'POST',
    body: params,
  })
}
