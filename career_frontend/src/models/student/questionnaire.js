import { isResOK } from '@/utils/BizUtil';
import {
  getQuestionnaireList,
  getQuestionnaireDetail,
  submitQuestionnaire,
  completedQuestionnaire
}from '@/services/common/studentQuestionnaire';

const servToReduce = {
  getQuestionnaireList: { method: getQuestionnaireList, reduce: 'getQuestionnaireList' },
  getQuestionnaireDetail: { method: getQuestionnaireDetail, reduce: 'getQuestionnaireDetail' },
  submitQuestionnaire: { method: submitQuestionnaire, reduce: null },
  completedQuestionnaire: { method:completedQuestionnaire, reduce: 'completedQuestionnaire' },
}

export default {
  namespace: 'studentQuestionnaire',
  state: {
    questionnaireList: null,
    questionnaireDetail: null,
  },

  effects: {
    *reqCommon({service, payload, callback}, {call, put}) {
      const postParamObj = servToReduce[service];
      const response = yield call(postParamObj.method, payload);
      if (isResOK(response)) {
        const { reduce } = postParamObj;
        if(response.data) {
          if (reduce) {
            yield put({
              type: reduce,
              payload: response.data,
            });
          }
        } else if (reduce) {
          yield put({
            type: reduce,
            payload: [],
          });
        }
        if (callback) callback();
      }
    }
  },
  reducers: {
    getQuestionnaireList(state, action) {
      return {
        ...state,
        questionnaireList: action.payload
      }
    },
    getQuestionnaireDetail(state, action) {
      return {
        ...state,
        questionnaireDetail: action.payload,
      }
    },
    completedQuestionnaire(state, action) {
      return {
        ...state,
        questionnaireDetail: action.payload,
      }
    }
  }
}
