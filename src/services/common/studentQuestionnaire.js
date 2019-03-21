import { stringify } from 'qs';
import request from '@/utils/request';

// 问卷调查列表
export async function getQuestionnaireList(params) {
  return request(`/question/Questionnairec/ApiListWJ?${stringify(params)}`);
}

export async function getQuestionnaireDetail(params) {
  return request(`/question/Questionnairec/ApiGetWJinfo?${stringify(params)}`);
}

export async function submitQuestionnaire(params) {
  return request('/question/Questionnairec/ApiSubmitQue', {
    method: 'POST',
    body: params,
  })
}

export async function completedQuestionnaire(params) {
  return request(`/question/Questionnairec/ApiGetWenjuanInfoMyself?${stringify(params)}`);
}
