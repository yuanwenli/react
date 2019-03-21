import { stringify } from 'qs';
import request from '@/utils/request';

// 查看班级列表
export async function getClass(params) {
  return request(`/user/Classmanage/ApiSchoolGetClassId?${stringify(params)}`);
}

// 可单个，批量 勾选使用班级
export async function chooseClass(params) {
  return request('/user/Classmanage/ApiBatchState', {
    method: 'PUT',
    body: params,
  })
}

// 修改班级
export async function editClass(params) {
  return request('/user/Classmanage/ApiPutClasss', {
    method: 'PUT',
    body: params,
  })
}

// 查看单个班级
export async function getSignalClass(params) {
  return request(`/user/Classmanage/ApiGetClasss?${stringify(params)}`);
}

// 根据班级Id 查询所有的老师
export async function getClassTeacher(params) {
  return request(`/user/Usersmanage/apiSelectClassTeacher?${stringify(params)}`);
}

// 校级，超级 勾选班级使用老师
export async function chooseClassTeacher(params) {
  return request('/user/Usersmanage/ApiClassChoiceUser', {
    method: 'POST',
    body: params
  })
}

// 查询学校得老师/非班主任得老师
export async function getSchoolTeacher(params) {
  return request(`/user/Teacherindex/SchoolTeacher?${stringify(params)}`);
}

// 查询所有年级
export async function getGrade(params) {
  return request(`/user/Schoolclass/apiSelectGrade?${stringify(params)}`);
}

// 根据班级id查询学生信息
export async function getStudentList(params) {
  return request(`/user/Manageuser/ApiSelectUserAll?${stringify(params)}`);
}

// 查询所有的家长
export async function getAllParents(params) {
  return request(`/user/Usersmanage/apiParentList?${stringify(params)}`);
}

// 学生关联家长
export async function relateParents(params) {
  return request('/user/Usersmanage/apiStudentParentRelation', {
    method: 'POST',
    body: params
  });
}

// 根据学生查询 绑定得家长
export async function getStudentParents(params) {
  return request(`/user/Teacherindex/apiStudentParent?${stringify(params)}`);
}

