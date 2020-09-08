import { isResOK } from '@/utils/BizUtil';
import {
  getFamilyList,
  editFamily,
  delFamily,
  addFamily,
  getSignalFamily,
}from '@/services/parents/family';

const servToReduce = {
  getFamilyList: { method: getFamilyList, reduce: 'getFamilyList' },
  editFamily: { method: editFamily, reduce: null },
  delFamily: { method: delFamily, reduce: null },
  addFamily: { method: addFamily, reduce: null },
  getSignalFamily: { method: getSignalFamily, reduce: 'getSignalFamily' },
}

export default {
  namespace: 'family',
  state: {
    familyList: null,
    signalFamily: null
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
    getFamilyList(state, action) {
      return {
        ...state,
        familyList: action.payload,
      }
    },
    getSignalFamily(state, action) {
      return {
        ...state,
        signalFamily: action.payload,
      }
    }
  }
}
