import { stringify } from 'qs';
import request from '@/utils/request';

// 量表列表
export async function getList(params) {
  return request(`/testEvaluation/Admin/apiEvaluationSchool?${stringify(params)}`);
}

// 发放量表
export async function sendEvaluation(params) {
  return request('/testEvaluation/Admin/apiAddEvaluationClass', {
    method: 'POST',
    body: params
  })
}

// 选择班级
export async function selectClass(params) {
  return request('/testEvaluation/Admin/apiSelectClass', {
    method: 'POST',
    body: params,
  })
}

// 班级量表列表
export async function getClassEvaluationList(params) {
  return request(`/testEvaluation/Admin/apiEvaluationClassList?${stringify(params)}`);
}

// 关闭班级量表
export async function closeClassEvaluation(params) {
  return request(`/testEvaluation/Admin/apiCloseEvaluationClass?${stringify(params)}`);
}

// 关闭分组班级量表
export async function closeGroupEvaluation(params) {
  return request(`/testEvaluation/Admin/apiCloseEvaluationClassGroup?${stringify(params)}`);
}

// 修改量表时间
export async function editEvaluationTime(params) {
  return request('/testEvaluation/Admin/apiEditEvaluationClass', {
    method: 'POST',
    body: params,
  })
}

// 分组班级列表
export async function getEvaluationClass(params) {
  return request(`/testEvaluation/Admin/apiEvaluationClassGroupList?${stringify(params)}`);
}

// 班级学生详情
export async function getClassDetail(params) {
  return request(`/testEvaluation/Admin/apiSelectClassStudent?${stringify(params)}`);
}

// 学生量表统计
export async function getStudentEvaluation(params) {
  return request(`/testEvaluation/Admin/apiFindStudentEvaluation?${stringify(params)}`);
}

// 查看学生测试的量表信息
export async function getStudentExamEvaluation(params) {
  return request(`/testEvaluation/Student/apiStudentEvaluation?${stringify(params)}`);
}

// 预览量表
export async function preview(params) {
  return request(`/testEvaluation/Admin/apiOkSubject?${stringify(params)}`);
}
