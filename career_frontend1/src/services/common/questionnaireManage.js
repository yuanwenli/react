import { stringify } from 'qs';
import request from '@/utils/request';

// 第一步
export async function addFirst(params) {
  return request('/question/Questionnairec/ApiFirstWJAdd', {
    method: 'POST',
    body: params,
  })
}

// 第二步
export async function addSecond(params) {
  return request('/question/Questionnairec/ApiSecondWJAdd', {
    method: 'POST',
    body: params,
  })
}

// 第三步
export async function addThird(params) {
  return request('/question/Questionnairec/ApiLasttWJAdd', {
    method: 'POST',
    body: params,
  })
}

// 预览问卷
export async function preview(params) {
  return request(`/question/Questionnairec/ApiPreviewWJ?${stringify(params)}`);
}

// 开关问卷
export async function openQuestionnaire(params) {
  return request('/question/Questionnairec/ApiStateWJPut', {
    method: 'PUT',
    body: params,
  })
}

// 问卷列表
export async function questionnaireList(params) {
  return request(`/question/Questionnairec/ApiListWJ?${stringify(params)}`);
}

// 删除问卷
export async function delQuestionnaire(params) {
  return request('/question/Questionnairec/ApiStateWJDel', {
    method: 'delete',
    body: params,
  })
}
