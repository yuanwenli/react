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
  classMateActivity
}from '@/services/student/activity';

const servToReduce = {
  getMyActivityList: { method: getMyActivityList, reduce: 'getMyActivityList'},
  addActivity: { method: addActivity, reduce: null },
  getSignalActivity: { method: getSignalActivity, reduce: 'getSignalActivity' },
  editActivity: { method: editActivity, reduce: null },
  delActivity: { method: delActivity, reduce: null },
  getClassActivity: { method: getClassActivity, reduce: 'getClassActivity' },
  // getEvaluateActivity: { method: getClassActivity, reduce: 'getEvaluateActivity' },
  getClassActivityDetail: { method: getClassActivityDetail, reduce: 'getClassActivityDetail' },
  joinActivity: { method: joinActivity, reduce: null },
  classMateActivity: { method: classMateActivity, reduce: 'classMateActivity' },
}

export default {
  namespace: 'studentActivity',
  state: {
    classMateList:null,
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
    // getEvaluateActivity(state, action) {
    //   return {
    //     ...state,
    //     evaluateActivity: [{
    //       "id":"1",
    //       "name":"非常喜欢"
    //     },{
    //       "id":"2",
    //       "name":"喜欢"
    //     },{
    //       "id":"3",
    //       "name":"一般"
    //     },{
    //       "id":"4",
    //       "name":"不喜欢"
    //     }]
    //   }
    // },
    getClassActivityDetail(state, action) {
      return {
        ...state,
        classActivityDetail: action.payload
      }
    },
    classMateActivity(state, action) {
      return {
        ...state,
        classMateList: action.payload,
      }
    }
  }
}
