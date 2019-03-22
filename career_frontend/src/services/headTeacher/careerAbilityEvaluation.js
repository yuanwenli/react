import { stringify } from 'qs';
import request from '@/utils/request';

// 生涯能力评估列表
export async function getList(params) {
  return request(`${stringify(params)}`);
}
// 生涯能力评估详情
export async function getDetail(params) {
  return request(`${stringify(params)}`);
}
// 评分
export async function evaluationScore(params) {
  return request(`${stringify(params)}`);
}

// 删除
export async function delEvaluation(params) {
  return request('', {
    method: 'DELETE',
    body: params,
  })
}
