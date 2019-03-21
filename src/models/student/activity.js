import { isResOK } from '@/utils/BizUtil';
import {
  getMyActivityList,
  addActivity,
  getSignalActivity,
  editActivity,
  delActivity,
  getClassActivity,
  getClassActivityDetail,
  joinActivity,
  classStudentActivity
}from '@/services/student/activity';

const servToReduce = {
  getMyActivityList: { method: getMyActivityList, reduce: 'getMyActivityList'},
  addActivity: { method: addActivity, reduce: null },
  getSignalActivity: { method: getSignalActivity, reduce: 'getSignalActivity' },
  editActivity: { method: editActivity, reduce: null },
  delActivity: { method: delActivity, reduce: null },
  getClassActivity: { method: getClassActivity, reduce: 'getClassActivity' },
  getClassActivityDetail: { method: getClassActivityDetail, reduce: 'getClassActivityDetail' },
  joinActivity: { method: joinActivity, reduce: null },
  classStudentActivity: { method: classStudentActivity, reduce: 'classStudentActivity' },
}

export default {
  namespace: 'studentActivity',
  state: {
    activityList: null,
    signalActivity: null,
    classActivity: null,
    classActivityDetail: null,
    classStudentActivity: null
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
        activityList: action.payload
      }
    },
    getSignalActivity(state, action) {
      return {
        ...state,
        signalActivity: action.payload,
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
        classActivityDetail: action.payload
      }
    },
    classStudentActivity(state, action) {
      return {
        ...state,
        classStudentActivity: action.payload,
      }
    }
  }
}
