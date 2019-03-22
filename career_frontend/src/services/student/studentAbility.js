import { stringify } from 'qs';
import request from '@/utils/request';

// 生涯能力评估
export async function getAbilityList(params) {
  return request(`?${stringify(params)}`);
}

// 查看试卷题目
export async function getTitle(params) {
  return request(`?${stringify(params)}`);
}

// 提交答案
export async function submitAnswer(params) {
  return request('', {
    method: 'POST',
    body: params,
  })
}

// 查看评分结果
export async function getResult(params) {
  return request(`?${stringify(params)}`);
}
