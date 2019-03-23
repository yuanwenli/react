import { isResOK } from '@/utils/BizUtil';
import {
  getRankList,
  addRank,
  editRank,
  getSignalRank,
  delRank
}from '@/services/parents/rank';

const servToReduce = {
  getRankList: { method: getRankList, reduce: 'getRankList' },
  addRank: { method: addRank, reduce: null },
  editRank: { method: editRank, reduce: null },
  getSignalRank: { method: getSignalRank, reduce: 'getSignalRank' },
  delRank: { method: delRank, reduce: null },
}

export default {
  namespace: 'rank',
  state: {
    rankList: null,
    signalRank: null
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
    getRankList(state, action) {
      return {
        ...state,
        rankList: action.payload,
      }
    },
    getSignalRank(state, action) {
      return {
        ...state,
        signalRank: action.payload,
      }
    }
  }
}
