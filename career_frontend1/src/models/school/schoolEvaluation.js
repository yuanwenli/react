import { isResOK } from '@/utils/BizUtil';
import {
  getList,
  sendEvaluation,
  selectClass,
  getClassEvaluationList,
  closeClassEvaluation,
  closeGroupEvaluation,
  editEvaluationTime,
  getEvaluationClass,
  getClassDetail,
  getStudentEvaluation,
  getStudentExamEvaluation,
  preview,
}from '@/services/school/schoolEvaluation';

const servToReduce = {
  getList: { method: getList, reduce: 'getList' },
  sendEvaluation: { method: sendEvaluation, reduce: null },
  selectClass: { method: selectClass, reduce: 'selectClass' },
  getClassEvaluationList: { method: getClassEvaluationList, reduce: 'getClassEvaluationList' },
  closeClassEvaluation: { method: closeClassEvaluation, reduce: null },
  closeGroupEvaluation: { method: closeGroupEvaluation, reduce: null },
  editEvaluationTime: { method: editEvaluationTime, reduce: null },
  getEvaluationClass: { method: getEvaluationClass, reduce: 'getEvaluationClass' },
  getClassDetail: { method: getClassDetail, reduce: 'getClassDetail' },
  getStudentEvaluation: { method: getStudentEvaluation, reduce: 'getStudentEvaluation' },
  getStudentExamEvaluation: { method: getStudentExamEvaluation, reduce: 'getStudentExamEvaluation' },
  preview: { method: preview, reduce: 'preview' },
}

export default {
  namespace: 'schoolEvaluation',
  state: {
    getList: null,
    selectClass: null,
    classEvaluationList: null,
    evaluationClass: null,
    classDetail: null,
    studentEvaluation: null,
    studentExamEvaluation: null,
    preview: null,
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
        if (callback) callback(response);
      }
    }
  },
  reducers: {
    getList(state, action) {
      return {
        ...state,
        getList: action.payload,
      }
    },
    selectClass(state, action) {
      return {
        ...state,
        selectClass: action.payload,
      }
    },
    getClassEvaluationList(state, action) {
      return {
        ...state,
        classEvaluationList: action.payload,
      }
    },
    getEvaluationClass(state, action) {
      return {
        ...state,
        evaluationClass: action.payload,
      }
    },
    getClassDetail(state, action) {
      return {
        ...state,
        classDetail: action.payload,
      }
    },
    getStudentEvaluation(state, action) {
      return {
        ...state,
        studentEvaluation: action.payload,
      }
    },
    getStudentExamEvaluation(state, action) {
      return {
        ...state,
        studentExamEvaluation: action.payload,
      }
    },
    preview(state, action) {
      return {
        ...state,
        preview: action.payload,
      }
    }
  }
}
