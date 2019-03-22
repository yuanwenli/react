import { stringify } from 'qs';
import request from '@/utils/request';

export async function getStudentRecord(params) {
  return request(`/user/Teacherindex/apiSelectTeacherStudent?${stringify(params)}`);
}
