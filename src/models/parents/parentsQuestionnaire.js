import { isResOK } from '@/utils/BizUtil';
import {
  getQuestionnaireList,
  getQuestionnaireDetail
}from '@/services/common/studentQuestionnaire';

const servToReduce = {
  getQuestionnaireList: { method: getQuestionnaireList, reduce: 'getQuestionnaireList' },
  getQuestionnaireDetail: { method: getQuestionnaireDetail, reduce: 'getQuestionnaireDetail' },
}

export default {
  namespace: 'parentsQuestionnaire',
  state: {
    questionnaireList: {},
    questionnaireDetail: {},
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
        questionnaireList: action.payload,
      }
    },
    getQuestionnaireDetail(state, action) {
      return {
        ...state,
        questionnaireDetail: action.payload,
      }
    }
  }
}
