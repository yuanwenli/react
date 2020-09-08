import { isResOK } from '@/utils/BizUtil';
import {
  getList,
  getTitle,
  submitSignalAnswer,
  handInExamination,
  getReport,
  getHistory,
  getSignalAnswer
}from '@/services/common/exam';

const servToReduce = {
  getList: { method: getList, reduce: 'getList' },
  getTitle: { method: getTitle, reduce: 'getTitle' },
  submitSignalAnswer: { method: submitSignalAnswer, reduce: null },
  handInExamination: { method: handInExamination, reduce: null },
  getReport: { method: getReport, reduce: 'getReport' },
  getHistory: { method: getHistory, reduce: 'getHistory' },
  getSignalAnswer: { method:getSignalAnswer, reduce: 'getSignalAnswer' },
}

export default {
  namespace: 'studentExam',
  state: {
    listData: null,
    titleData: null,
    reportData: null,
    historyData: null,
    signalAnswer: null
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
        if (callback) callback(response.data);
      }
    }
  },
  reducers: {
    getList(state, action) {
      return {
        ...state,
        listData: action.payload,
      }
    },
    getTitle(state, action) {
      return {
        ...state,
        titleData: action.payload,
      }
    },
    getReport(state, action) {
      return {
        ...state,
        reportData: action.payload,
      }
    },
    historyData(state, action) {
      return {
        ...state,
        historyData: action.payload,
      }
    },
    getSignalAnswer(state, action) {
      return {
        ...state,
        signalAnswer: action.payload,
      }
    }
  }
}
