import { isResOK } from '@/utils/BizUtil';
import {
  getClass,
  chooseClass,
  editClass,
  getSignalClass,
  getClassTeacher,
  chooseClassTeacher,
  getSchoolTeacher,
  getGrade,
  getStudentList,
  getStudentParents,
  getAllParents,
  relateParents,
}from '@/services/school/classManage';

const servToReduce = {
  getClass: { method: getClass, reduce: 'getClass' },
  chooseClass: { method: chooseClass, reduce: null },
  editClass: { method: editClass, reduce: null },
  getSignalClass: { method: getSignalClass, reduce: 'getSignalClass' },
  getClassTeacher: { method: getClassTeacher, reduce: 'getClassTeacher' },
  chooseClassTeacher: { method: chooseClassTeacher, reduce: null },
  getSchoolTeacher: { method: getSchoolTeacher, reduce: 'getSchoolTeacher' },
  getGrade: { method: getGrade, reduce: 'getGrade' },
  getStudentList: { method: getStudentList, reduce: 'getStudentList' },
  getStudentParents: { method: getStudentParents, reduce: 'getStudentParents' },
  relateParents: { method: relateParents, reduce: null },
  getAllParents: { method: getAllParents, reduce: 'getAllParents' },
}

export default {
  namespace: 'classManage',
  state: {
    getClass: null,
    signalClass: null,
    classTeacher: null,
    schoolTeacher: null,
    getGrade: null,
    studentList: null,
    studentParents: null,
    allParents: null,
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
    getClass(state, action) {
      return {
        ...state,
        getClass: action.payload
      }
    },
    getSignalClass(state, action) {
      return {
        ...state,
        signalClass: action.payload
      }
    },
    getClassTeacher(state, action) {
      return {
        ...state,
        classTeacher: action.payload,
      }
    },
    getSchoolTeacher(state, action) {
      return {
        ...state,
        schoolTeacher: action.payload
      }
    },
    getGrade(state, action) {
      return {
        ...state,
        getGrade: action.payload,
      }
    },
    getStudentList(state, action) {
      return {
        ...state,
        studentList: action.payload,
      }
    },
    getAllParents(state, action) {
      return {
        ...state,
        allParents: action.payload,
      }
    },
    getStudentParents(state, action) {
      return {
        ...state,
        studentParents: action.payload,
      }
    },
  }
}
