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

// 家长评分
export async function submitScore(params) {
  return request('', {
    method: 'POST',
    body: params,
  })
}

// 查看评分结果
export async function getResult(params) {
  return request(`?${stringify(params)}`);
}
