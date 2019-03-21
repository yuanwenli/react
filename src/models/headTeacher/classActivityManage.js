import { isResOK } from '@/utils/BizUtil';
import {
  getClassActivityList,
  addClassActivity,
  editActivity,
  delActivity,
  getSignalActivity,
  openActivity,
  sendActivityNotice
} from '@/services/headTeacher/classActivityManage';

const servToReduce = {
  getClassActivityList: { method: getClassActivityList, reduce: 'getClassActivityList' },
  addClassActivity: { method: addClassActivity, reduce: null },
  editActivity: { method: editActivity, reduce: null },
  sendActivityNotice: { method: sendActivityNotice, reduce: null },
  delActivity: { method: delActivity, reduce: null },
  getSignalActivity: { method: getSignalActivity, reduce: 'getSignalActivity' },
  openActivity: { method: openActivity, reduce: null },
}

export default {
  namespace: 'classActivityManage',
  state: {
    classActivityList: null,
    signalActivity: null
  },

  effects: {
    *reqCommon({ service, payload, callback }, { call, put }) {
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
    }
  },
  reducers: {
    getClassActivityList(state, action) {
      return {
        ...state,
        classActivityList: action.payload,
      }
    },
    getSignalActivity(state, action) {
      return {
        ...state,
        signalActivity: action.payload,
      }
    }
  }
}
