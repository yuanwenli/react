import { stringify } from 'qs';
import request from '@/utils/request';

// 查看试卷
export async function getPaperDetail(params) {
  return request(`/question/Sendout/ApiGetTestInfo?${stringify(params)}`);
}

// 学生、家长能力列表
export async function getStudentAbilityList(params) {
  return request(`/question/Sendout/ApiTextGetListSP?${stringify(params)}`);
}

// 学生，家长提交能力测评试卷
export async function submitAbilityTest(params) {
  return request('/question/Sendout/ApiStudentCommintText', {
    method: 'POST',
    body: params,
  })
}

// 老师，班主任能力测评打分提交
export async function markTest(params) {
  return request('/question/Sendout/ApiPTHSubmitText', {
    method: 'POST',
    body: params,
  })
}

// 生涯老师,班主任 能力测评试卷列表 一级菜单列表
export async function getTeacherAbilityList(params) {
  return request(`/question/Sendout/ApiTextGetListTHS?${stringify(params)}`);
}

// 校管理员 能力测评试卷列表 一级菜单列表
export async function getSchoolAbilityList(params) {
  return request(`/question/Sendout/ApiTextGetListS?${stringify(params)}`);
}

// 老师，班主任，校级管理员 二级列表页面
export async function getAbilityPageTwo(params) {
  return request(`/question/Sendout/ApiTextGetListTHStWO?${stringify(params)}`);
}

// 学生，家长 查看试卷详情
export async function getStudentAbilityDetail(params) {
  return request(`/question/Sendout/ApiGetTestInfoSP?${stringify(params)}`);
}

// 老师，班主任，校级，区级，超级 查看试卷 答题
export async function getAllAnswer(params) {
  return request(`/question/Sendout/ApiGetTestInfoOther?${stringify(params)}`);
}
