import { stringify } from 'qs';
import request from '@/utils/request';

// 班级测评报告
export async function getClassReport(params) {
  return request(`/testEvaluation/Evaluationclass/apiSelectEvaluationClass?${stringify(params)}`);
}
// 班级测评报告详情
export async function getClassReportDetail(params) {
  return request(`/testEvaluation/Evaluationclass/apiEvaluationStudentClass?${stringify(params)}`);
}

// 班级生涯活动
export async function getClassActivity(params) {
  return request(`${stringify(params)}`);
}

// 班级动态
export async function getClassDynamic(params) {
  return request(`${stringify(params)}`);
}
