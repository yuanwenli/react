import { stringify } from 'qs';
import request from '@/utils/request';

// 院校，专业
export async function schoolList(params) {
  return request(`/occupation/Academyindex/apiSelectAcademy?${stringify(params)}`);
}

// 关联学校
export async function getSelectSchool(params) {
  return request(`/occupation/Academyindex/apiSelectSchool?${stringify(params)}`);
}

// 职业类型
export async function getSelectProfession(params) {
  return request(`/occupation/Professionadmin/apiSelectProfession?${stringify(params)}`);
}

// 专业详情
export async function getMajorDetail(params) {
  return request(`/occupation/Academyadmin/apiFindMajorAcademy?${stringify(params)}`);
}


// 查询职业类型
export async function getProfessionType(params) {
  return request(`/occupation/Professionadmin/apiSelectProfession?${stringify(params)}`);
}

// 查询职业
export async function getProfession(params) {
  return request(`/occupation/Professionadmin/apiSelectPation?${stringify(params)}`);
}

// 查询分类
export async function getClass(params) {
  return request(`/occupation/Professionadmin/apiSelectClass?${stringify(params)}`);
}

// 查询单个职业
export async function getSignalProfession(params) {
  return request(`/occupation/Professionadmin/apiFindPation?${stringify(params)}`);
}

// 添加职业
export async function addProfession(params) {
  return request('/occupation/Professionadmin/apiAddPation', {
    method: 'POST',
    body: params,
  });
}

// 修改职业
export async function editProfession(params) {
  return request('/occupation/Professionadmin/apiUpdatePation', {
    method: 'POST',
    body: params,
  });
}

// 删除职业
export async function delProfession(params) {
  return request(`/occupation/Professionadmin/apiDeletePation?${stringify(params)}`);
}
