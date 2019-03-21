import { isResOK } from '@/utils/BizUtil';
import {
  getMyCareerredit,
  getMyCareerreditDetail,
  getMyCareerAbility,
  getMyCareerAbilityDetail1,
  getMyCareerAbilityDetail2,
  getMyCareerInterest,
  getMyCareerInterestDetail,
  getCareerTimeScore,
  getCareerYearScore,
  getMyScoreRank,
}from '@/services/common/evaluation';

const servToReduce = {
  getMyCareeredit: { method: getMyCareerredit, reduce: 'getMyCareerredit'},
  getMyCareerreditDetail: { method: getMyCareerreditDetail, reduce: 'getMyCareerreditDetail' },
  getMyCareerAbility: { method: getMyCareerAbility, reduce: 'getMyCareerAbility' },
  getMyCareerAbilityDetail1: { method: getMyCareerAbilityDetail1, reduce: 'getMyCareerAbilityDetail1' },
  getMyCareerAbilityDetail2: { method: getMyCareerAbilityDetail2, reduce: 'getMyCareerAbilityDetail2' },
  getMyCareerInterest: { method: getMyCareerInterest, reduce: 'getMyCareerInterest' },
  getCareerTimeScore: { method: getCareerTimeScore, reduce: 'getCareerTimeScore' },
  getCareerYearScore: { method: getCareerYearScore, reduce: 'getCareerYearScore' },
  getMyCareerInterestDetail: { method: getMyCareerInterestDetail, reduce: 'getMyCareerInterestDetail' },
  getMyScoreRank: { method: getMyScoreRank, reduce: 'getMyScoreRank' },

}

export default {
  namespace: 'evaluation',
  state: {
    careeredit: null,
    careerreditDetail: null,
    careerAbility: null,
    careerAbilityDetail1: null,
    careerAbilityDetail2: null,
    careerInterest: null,
    careerInterestDetail: null,
    careerTimeScore: null,
    careerYearScore: null,
    scoreRank: null
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
    getMyCareerredit(state, action) {
      return {
        ...state,
        careeredit: action.payload,
      }
    },
    getMyCareerreditDetail(state, action) {
      return {
        ...state,
        careerreditDetail: action.payload,
      }
    },
    getMyCareerAbility(state, action) {
      return {
        ...state,
        careerAbility: action.payload,
      }
    },
    getMyCareerAbilityDetail1(state, action) {
      return {
        ...state,
        careerAbilityDetail1: action.payload,
      }
    },
    getMyCareerAbilityDetail2(state, action) {
      return {
        ...state,
        careerAbilityDetail2: action.payload,
      }
    },
    getMyCareerInterest(state, action) {
      return {
        ...state,
        careerInterest: action.payload,
      }
    },
    getMyCareerInterestDetail(state, action) {
      return {
        ...state,
        careerInterestDetail: action.payload,
      }
    },
    getCareerTimeScore(state, action) {
      return {
        ...state,
        careerTimeScore: action.payload
      }
    },
    getCareerYearScore(state, action) {
      return {
        ...state,
        careerYearScore: action.payload
      }
    },
    getMyScoreRank(state, action) {
      return {
        ...state,
        scoreRank: action.payload,
      }
    }
  }
}
