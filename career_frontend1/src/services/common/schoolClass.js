import { stringify } from 'qs';
import request from '@/utils/request';

export async function getSchool() {
  return request(`/user/Schoolclass/SchoolList`);
}

export async function getClass(params) {
  return request(`/user/Schoolclass/ClassList?${stringify(params)}`);
}
