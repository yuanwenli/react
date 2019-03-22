import { isResOK } from '@/utils/BizUtil';
import {
  getClassActivityList,
  getClassActivityDetail,
}from '@/services/parents/classActivity';

const servToReduce = {
  getClassActivityList: { method: getClassActivityList, reduce: 'getClassActivityList' },
  getClassActivityDetail: { method: getClassActivityDetail, reduce: 'getClassActivityDetail' },
}

export default {
  namespace: 'parentsClassActivity',
  state: {
    classActivityList: {},
    classActivityDetail: {},
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
    getClassActivityList(state, action) {
      return {
        ...state,
        classActivityList: action.payload,
      }
    },
    getClassActivityDetail(state, action) {
      return {
        ...state,
        classActivityDetail: action.payload,
      }
    }
  }
}
