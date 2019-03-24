import { stringify } from 'qs';
import request from '@/utils/request';

// 查询学校
export async function getSchool(params) {
  return request(`/user/Schoolclass/SchoolList?${stringify(params)}`);
}

// 查询教师下的班级
export async function getTeacherClass() {
  return request(`/user/Teacherindex/apiSelectClass`);
}

// 查询学校下的班级
export async function getClass(params) {
  return request(`/user/Schoolclass/ClassList?${stringify(params)}`);
}

// 查询家长的孩子
export async function getChild() {
  return request('/user/Parents/apiStudentInfo');
}

// 家长查看自己学生的信息列表
export async function getChildDetail(params) {
  return request(`/user/Manageuser/ApiSelectStudentAll?${stringify(params)}`);
}

// 查询所有年级
export async function getGrade() {
  return request('/user/Schoolclass/apiSelectGrade');
}

// 消息列表
export async function getNotice(params) {
  return request(`/studentInfo/Notice/apiNoticeList?${stringify(params)}`);
}

// 单个消息信息
export async function getSignalNotice(params) {
  return request(`/studentInfo/Notice/apiFindNotice?${stringify(params)}`);
}

// 统计未读消息
export async function getUnRead() {
  return request('/studentInfo/Notice/apiCountNotice')
}

// 根据Token获取用户信息
export async function getUserInfo(params) {
  return request(`/user/Login/apiUserInfo?${stringify(params)}`);
}
