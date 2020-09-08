import { isResOK } from '@/utils/BizUtil';
import {
  getList,
  getDetail,
  evaluationScore,
  delEvaluation
}from '@/services/headTeacher/careerAbilityEvaluation';

const servToReduce = {
  getList: { method: getList, reduce: 'getList' },
  getDetail: { method: getDetail, reduce: 'getDetail' },
  evaluationScore: { method: evaluationScore, reduce: 'evaluationScore' },
  delEvaluation: { method: delEvaluation, reduce: null },
}

export default {
  namespace: 'careerAbilityEvaluation',
  state: {
    list: {},
    detail: {},
    evaluationScore: {},
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
    getList(state, action) {
      return {
        ...state,
        list: action.payload
      }
    },
    getDetail(state, action) {
      return {
        ...state,
        detail: action.payload
      }
    },
    evaluationScore(state, action) {
      return {
        ...state,
        evaluationScore: action.payload
      }
    }
  }
}
