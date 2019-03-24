import { isResOK } from '@/utils/BizUtil';
import {
  getMajorDetail,
  schoolList,
  getSelectSchool,
  getSelectProfession,
  getSelectPation,
  getSelectClass,
  getfindPation,
  searchPation,
}from '@/services/common/professionSchool';

const servToReduce = {
  getMajorDetail: { method: getMajorDetail, reduce: 'getMajorDetail' },
  schoolList: { method: schoolList, redeuce: 'schoolList' },
  getSelectSchool: { method: getSelectSchool, reduce: 'getSelectSchool' },
  getSelectProfession: { method: getSelectProfession, reduce: 'getSelectProfession' },
  getSelectPation: { method: getSelectPation, reduce: 'getSelectPation' },
  getSelectClass: { method: getSelectClass, redeuce: 'getSelectClass' },
  getfindPation: { method: getfindPation, reduce: 'getfindPation' },
  searchPation: { method: searchPation, reduce: 'searchPation' },
}

export default {
  namespace: 'parentsProfessionSchool',
  state: {
    majorDetail: {},
    schoolList: {},
    selectSchool: {},
    selectProfession: {},
    selectPation: {},
    selectClass: {},
    findPation: {},
    searchPatin: {},
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
    getMajorDetail(state, action) {
      return {
        ...state,
        majorDetail: action.payload
      }
    },
    schoolList(state, action)  {
      return {
        ...state,
        schoolList: action.payload
      }
    },
    getSelectSchool(state, action) {
      return {
        ...state,
        selectSchool: action.payload
      }
    },
    getSelectProfession(state, action) {
      return {
        ...state,
        selectProfession: action.payload,
      }
    },
    getSelectPation(state, action) {
      return {
        ...state,
        selectPation: action.payload,
      }
    },
    getSelectClass(state, action) {
      return {
        ...state,
        selectClass: action.payload,
      }
    },
    getfindPation(state, action) {
      return {
        ...state,
        findPation: action.payload,
      }
    },
    searchPation(state, action) {
      return {
        ...state,
        searchPation: action.payload,
      }
    }
  }
}
