import { isResOK } from '@/utils/BizUtil';
import {
  getStudentPlan,
  addStudentPlan,
  delStudentPlan,
  setIdol,
  suggetsIdol,
  studentIdol,
  idolList,
}from '@/services/common/person';

const servToReduce = {
  getStudentPlan: { method: getStudentPlan, reduce: 'getStudentPlan'}, // 查看生涯规划
  addStudentPlan: { method: addStudentPlan, reduce: null }, // 新增生涯规划
  delStudentPlan: { method: delStudentPlan, reduce: null }, // 删除生涯
  idolList: { method: idolList, reduce: 'idolList' }, // 偶像列表
  setIdol: { method: setIdol, reduce: null }, // 设置偶像
  suggetsIdol: { method: suggetsIdol, reduce: null }, // 新增偶像建议
  studentIdol: { method: studentIdol, reduce: 'studentIdol' }, // 当前偶像
}

export default {
  namespace: 'studentPerson',
  state: {
    getStudentPlan: null,
    studentIdol: {},
    idolList: {}
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
    getStudentPlan(state, action) {
      return {
        ...state,
        getStudentPlan: action.payload,
      }
    },
    studentIdol(state, action) {
      return {
        ...state,
        studentIdol: action.payload
      }
    },
    idolList(state, action) {
      if(action.payload) {
        return {
          ...state,
          idolList: action.payload
        }
      }
      return null
    }
  }
}
