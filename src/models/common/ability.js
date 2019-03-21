import { isResOK } from '@/utils/BizUtil';
import {
  getPaperDetail,
  getStudentAbilityList,
  submitAbilityTest,
  markTest,
  getTeacherAbilityList,
  getSchoolAbilityList,
  getAbilityPageTwo,
  getStudentAbilityDetail,
  getAllAnswer,
}from '@/services/common/ability';

const servToReduce = {
  getPaperDetail: { method: getPaperDetail, reduce: 'getPaperDetail' },
  getStudentAbilityList: { method: getStudentAbilityList, reduce: 'getStudentAbilityList' },
  submitAbilityTest: { method: submitAbilityTest, reduce: null },
  markTest: { method: markTest, reduce: null },
  getTeacherAbilityList: { method: getTeacherAbilityList, reduce: 'getTeacherAbilityList' },
  getSchoolAbilityList: { method: getSchoolAbilityList, reduce: 'getSchoolAbilityList' },
  getAbilityPageTwo: { method: getAbilityPageTwo, reduce: 'getAbilityPageTwo' },
  getStudentAbilityDetail: { method: getStudentAbilityDetail, reduce: 'getStudentAbilityDetail' },
  getAllAnswer: { method: getAllAnswer, reduce: 'getAllAnswer' },
}

export default {
  namespace: 'ability',
  state: {
    paperDetail: null,
    studentAbilityList: null,
    teacherAbilityList: null,
    schoolAbilityList: null,
    abilityPageTwo: null,
    studentAbilityDetail: null,
    allAnswer: null
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
    getPaperDetail(state, action) {
      return {
        ...state,
        paperDetail: action.payload
      }
    },
    getStudentAbilityList(state, action) {
      return {
        ...state,
        studentAbilityList: action.payload,
      }
    },
    getTeacherAbilityList(state, action) {
      return {
        ...state,
        teacherAbilityList: action.payload,
      }
    },
    getSchoolAbilityList(state, action) {
      return {
        ...state,
        schoolAbilityList: action.payload,
      }
    },
    getAbilityPageTwo(state, action) {
      return {
        ...state,
        abilityPageTwo: action.payload,
      }
    },
    getStudentAbilityDetail(state, action) {
      return {
        ...state,
        studentAbilityDetail: action.payload,
      }
    },
    getAllAnswer(state, action) {
      return {
        ...state,
        allAnswer: action.payload,
      }
    }
  }
}
