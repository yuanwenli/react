import { isResOK } from '@/utils/BizUtil';
import {
  getMyCourseList,
  addMyCourse,
  delMyCourse,
}from '@/services/headTeacher/studyManage';

const servToReduce = {
  getMyCourseList: { method: getMyCourseList, reduce: 'getMyCourseList' },
  addMyCourse: { method: addMyCourse, reduce: null },
  delMyCourse: { method: delMyCourse, reduce: null },
}

export default {
  namespace: 'studyManage',
  state: {
    myCourseList: {},
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
    getMyCourseList(state, action) {
      return {
        ...state,
        myCourseList: action.payload
      }
    }
  }
}
