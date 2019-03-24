import { stringify } from 'qs';
import request from '@/utils/request';

// 学生个人信息
// 查看生涯规划
export async function getStudentPlan(params) {
  return request(`/studentInfo/plan/ApiStudnetPlanGet?${stringify(params)}`);
}

// 新增生涯规划
export async function addStudentPlan(params) {
  return request('/studentInfo/plan/ApiStudentPlanAdd', {
    method: 'POST',
    body: params,
  });
}

// 删除生涯
export async function delStudentPlan(params) {
  return request(`/studentInfo/plan/ApiStudentPlanDel?${stringify(params)}`, {
    method: 'PUT',
  });
}

// 偶像列表
export async function idolList(params) {
  return request(`/studentInfo/Idoladmin/apiSelectIdol?${stringify(params)}`);
}

// 设置偶像
export async function setIdol(params) {
  return request(`/studentInfo/Idolstudent/apiSetIdol?${stringify(params)}`);
}

// 新增偶像建议
export async function suggetsIdol(params) {
  return request('/studentInfo/Idolstudent/apiSuggestIdol', {
    method: 'POST',
    body: params,
  })
}

// 当前偶像
export async function studentIdol(params) {
  return request(`/studentInfo/Idolstudent/apiStudentIdol?${stringify(params)}`);
}

export async function familyTree(params) {
  return request(`${stringify(params)}`);
}
