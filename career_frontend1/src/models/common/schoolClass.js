import { isResOK } from '@/utils/BizUtil';
import {
  getSchool,
  getClass
} from '@/services/common/schoolClass';

const servToReduce = {
  getSchool: { method: getSchool, reduce: 'getSchool' },
  getClass: { method: getClass, reduce: 'getClass' },
}

export default {
  namespace: 'schoolClass',
  state: {
    schoolList: null,
    classList: null
  },
  effects: {
    * reqCommon({ service, payload, callback }, { call, put }) {
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
    },
  },
  reducers: {
    getSchool(state, action) {
      return {
        ...state,
        schoolList: action.payload
      }
    },
    getClass(state, action) {
      return {
        ...state,
        classList: action.payload
      }
    }
  },
};
