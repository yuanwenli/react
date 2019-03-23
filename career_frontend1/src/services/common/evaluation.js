import { stringify } from 'qs';
import request from '@/utils/request';

// 我的生涯学分
export async function getMyCareerredit(params) {
  return request(`/studentInfo/Statistics/apiStudentCredit?${stringify(params)}`);
}
// 我的生涯学分详情
export async function getMyCareerreditDetail(params) {
  return request(`/studentInfo/Statistics/apiStudentCreditDetail?${stringify(params)}`);
}

// 我的生涯能力
export async function getMyCareerAbility(params) {
  return request(`/studentInfo/Statistics/apiStudentAbility?${stringify(params)}`);
}
// 我的生涯能力详情
export async function getMyCareerAbilityDetail1(params) {
  return request(`/studentInfo/Statistics/apiStudentAbilityDetailOne?${stringify(params)}`);
}
export async function getMyCareerAbilityDetail2(params) {
  return request(`/studentInfo/Statistics/apiStudentAbilityDetailTwo?${stringify(params)}`);
}

// 我的生涯兴趣
export async function getMyCareerInterest(params) {
  return request(`/studentInfo/Statistics/apiStudentLable?${stringify(params)}`);
}
// 班级生涯活动节点
export async function getMyCareerInterestDetail(params) {
  return request(`/studentInfo/Statistics/apiStudentLableNode?${stringify(params)}`);
}

// 生涯兴趣节点分数
export async function getCareerTimeScore(params) {
  return request(`/studentInfo/Statistics/apiStudentLableDetail?${stringify(params)}`);
}

// 生涯兴趣年份分数
export async function getCareerYearScore(params) {
  return request(`/studentInfo/Statistics/apiStudentLableYear?${stringify(params)}`);
}


// 我的成绩排名
export async function getMyScoreRank(params) {
  return request(`/studentInfo/Statistics/apiSelectStudentResult?${stringify(params)}`);
}
