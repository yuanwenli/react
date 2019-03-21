import { isResOK } from '@/utils/BizUtil';
import {
  getMyActivityList,
  addActivity,
  editActivity,
  delActivity,
  getClassActivity,
  getClassActivityDetail,
}from '@/services/parents/myActivity';

const servToReduce = {
  getMyActivityList: { method: getMyActivityList, reduce: 'getMyActivityList' },
  addActivity: { method: addActivity, reduce: null },
  editActivity: { method: editActivity, reduce: null },
  delActivity: { method: delActivity, reduce: null },
  getClassActivity: { method: getClassActivity, reduce: 'getClassActivity' },
  getClassActivityDetail: { method: getClassActivityDetail, reduce: 'getClassActivityDetail' },
}

export default {
  namespace: 'parentsMyActivity',
  state: {
    activityList: {},
    classActivity: {},
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
    getMyActivityList(state, action) {
      return {
        ...state,
        activityList: action.payload,
      }
    },
    getClassActivity(state, action) {
      return {
        ...state,
        classActivity: action.payload
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
