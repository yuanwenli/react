import { stringify } from 'qs';
import request from '@/utils/request';

// 获取列表
export async function getList(params) {
  return request(`/testEvaluation/Index/apiSelectList?${stringify(params)}`);
}

// 获取题目
export async function getTitle(params) {
  return request(`/testEvaluation/Index/apiFindEvaluation?${stringify(params)}`)
}

// 提交单个答案
export async function submitSignalAnswer(params) {
  return request('/testEvaluation/Index/apiSubmitOneEvaluation', {
    method: 'POST',
    body: params,
  });
}

// 交卷
export async function handInExamination(params) {
  return request('/testEvaluation/Index/apiSubmitEvaluation', {
    method: 'POST',
    body: params,
  });
}

// 查询量表结果
export async function getReport(params) {
  return request(`/testEvaluation/Student/apiFindStudentEvaluations?${stringify(params)}`);
}

// 查询量表历史
export async function getHistory(params) {
  return request(`/testEvaluation/Student/apiFindStudentEvaluations?${stringify(params)}`);
}

// 获取单题答案
export async function getSignalAnswer(params) {
  return request(`/testEvaluation/Index/apiAnswerEvaluation?${stringify(params)}`);
}
