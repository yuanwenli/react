import { stringify } from 'qs';
import request from '@/utils/request';

// 获取成绩排名列表
export async function getRankList(params) {
  return request(`/user/Parents/apiSelectStudentResultPage?${stringify(params)}`);
}

// 添加成绩排名
export async function addRank(params) {
  return request('/user/Parents/apiAddStudentResult', {
    method: 'POST',
    body: params
  });
}

// 修改成绩
export async function editRank(params) {
  return request('/user/Parents/apiUpdateStudentResult', {
    method: 'POST',
    body: params
  });
}

// 单个查询成绩
export async function getSignalRank(params) {
  return request(`/user/Parents/apiFindStudentResult?${stringify(params)}`);
}

// 删除成绩
export async function delRank(params) {
  return request(`/user/Parents/apiDeleteStudentResult?${stringify(params)}`);
}
