import { isResOK } from '@/utils/BizUtil';
import {
  getSchool,
  getTeacherClass,
  getClass,
  getChild,
  getChildDetail,
  getGrade,
  getNotice,
  getSignalNotice,
  getUnRead,
  getUserInfo,
}from '@/services/common/message';

const servToReduce = {
  getSchool: { method: getSchool, reduce: 'getSchool' },
  getTeacherClass: { method: getTeacherClass, reduce: 'getTeacherClass' },
  getClass: { method:getClass, reduce: 'getClass' },
  getChild: { method: getChild, reduce: 'getChild' },
  getChildDetail: { method: getChildDetail, reduce: 'getChildDetail' },
  getGrade: { method: getGrade, reduce: 'getGrade' },
  getNotice: { method: getNotice, reduce: 'getNotice' },
  getSignalNotice: { method: getSignalNotice, reduce: null },
  getUnRead: { method: getUnRead, reduce: 'getUnRead' },
  getUserInfo: { method: getUserInfo, reduce: 'getUserInfo' },
}

export default {
  namespace: 'messageData',
  state: {
    getSchool: null,
    getTeacherClass: null,
    getClass: null,
    getChild: null,
    getChildDetail: null,
    getGrade: null,
    getNotice: null,
    getUnRead: null,
    userInfo: null
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
    getSchool(state, action) {
      return {
        ...state,
        getSchool: action.payload,
      }
    },
    getTeacherClass(state, action) {
      return {
        ...state,
        getTeacherClass: action.payload,
      }
    },
    getClass(state, action) {
      return {
        ...state,
        getClass: action.payload,
      }
    },
    getChild(state, action) {
      return {
        ...state,
        getChild: action.payload,
      }
    },
    getChildDetail(state, action) {
      return {
        ...state,
        getChildDetail: action.payload
      }
    },
    getGrade(state, action) {
      return {
        ...state,
        getGrade: action.payload,
      }
    },
    getNotice(state, action) {
      return {
        ...state,
        getNotice: action.payload
      }
    },
    getUnRead(state, action) {
      return {
        ...state,
        getUnRead: action.payload,
      }
    },
    getUserInfo(state, action) {
      return {
        ...state,
        userInfo: action.payload,
      }
    }
  }
}
