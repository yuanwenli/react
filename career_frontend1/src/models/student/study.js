import { isResOK } from '@/utils/BizUtil';
import {
  getCourseList,
  getCourseDetail,
}from '@/services/common/course';

const servToReduce = {
  getCourseList: { method: getCourseList, reduce: 'getCourseList' },
  getCourseDetail: { method: getCourseDetail, reduce: 'getCourseDetail' },
}

export default {
  namespace: 'studentStudy',
  state: {
    courseList: [],
    courseDetail: []
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
    getCourseList(state, action) {
      return {
        ...state,
        courseList: action.payload
      }
    },
    getCourseDetail(state, action) {
      return {
        ...state,
        courseDetail: action.payload,
      }
    }
  }
}
