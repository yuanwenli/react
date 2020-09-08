import { isResOK } from '@/utils/BizUtil';
import {
  schoolScore,
  schoolInterest,
  signalInterest,
  schoolAbility,
} from '@/services/common/statistics';

const servToReduce = {
  schoolScore: { method: schoolScore, reduce: 'schoolScore' },
  schoolInterest: { method: schoolInterest, reduce: 'schoolInterest' },
  signalInterest: { method: signalInterest, reduce: 'signalInterest' },
  schoolAbility: { method: schoolAbility, reduce: 'schoolAbility' },
}

export default {
  namespace: 'statistics',
  state: {
    schoolScore: null,
    schoolInterest: null,
    signalInterest: null,
    schoolAbility: null,
  },
  effects: {
    * reqCommon({ service, payload, callback }, { call, put }) {
      const postParamObj = servToReduce[service];
      const response = yield call(postParamObj.method, payload);
      if (isResOK(response)) {
        const { reduce } = postParamObj;
        if (response.data) {
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
    },
  },
  reducers: {
    schoolScore(state, action) {
      return {
        ...state,
        schoolScore: action.payload
      }
    },
    schoolInterest(state, action) {
      return {
        ...state,
        schoolInterest: action.payload
      }
    },
    signalInterest(state, action) {
      return {
        ...state,
        signalInterest: action.payload
      }
    },
    schoolAbility(state, action) {
      return {
        ...state,
        schoolAbility: action.payload
      }
    }
  },
};
