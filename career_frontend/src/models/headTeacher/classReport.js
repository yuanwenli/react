import { isResOK } from '@/utils/BizUtil';
import {
  getArchivesList,
  getClassReport,
  getClassReportDetail,
  getClassActivity,
  getClassDynamic,
}from '@/services/headTeacher/classReport';

const servToReduce = {
  getArchivesList: { method: getArchivesList, reduce: 'getArchivesList' },
  getClassReport: { method: getClassReport, reduce: 'getClassReport' },
  getClassReportDetail: { method: getClassReportDetail, reduce: 'getClassReportDetail' },
  getClassActivity: { method: getClassActivity, reduce: 'getClassActivity' },
  getClassDynamic: { method: getClassDynamic, reduce: 'getClassDynamic' },
}

export default {
  namespace: 'classReport',
  state: {
    archiveList: {},
    classReport: {},
    classReportDetail: {},
    classActivity: {},
    classDynamic: {},
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
    getArchivesList(state, action) {
      return {
        ...state,
        archiveList: action.payload
      }
    },
    getClassReport(state, action) {
      return {
        ...state,
        classReport: action.payload
      }
    },
    getClassReportDetail(state, action) {
      return {
        ...state,
        classReportDetail: action.payload
      }
    },
    getClassActivity(state, action) {
      return {
        ...state,
        classActivity: action.payload
      }
    },
    getClassDynamic(state, action) {
      return {
        ...state,
        classDynamic: action.payload
      }
    }
  }
}
