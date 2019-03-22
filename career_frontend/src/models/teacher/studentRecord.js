import { isResOK } from '@/utils/BizUtil';
import {
  getStudentRecord,
}from '@/services/teacher/studentRecord';

const servToReduce = {
  getStudentRecord: { method: getStudentRecord, reduce: 'getStudentRecord' },
}

export default {
  namespace: 'studentRecord',
  state: {
    studentRecord: null,
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
    getStudentRecord(state, action) {
      return {
        ...state,
        studentRecord: action.payload,
      }
    }
  }
}
