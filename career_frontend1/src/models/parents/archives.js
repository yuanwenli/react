import { isResOK } from '@/utils/BizUtil';
import {
  getMyCareerredit,
  getMyCareerreditDetail,
  getMyCareerAbility,
  getMyCareerAbilityDetail,
  getMyCareerInterest,
  getMyCareerInterestDetail,
  getMyScoreRank,
}from '@/services/common/evaluation';
import { getMyActivityList } from '@/services/student/activity';
import { familyTree } from '@/services/common/person';



const servToReduce = {
  // 生涯评估
  getMyCareeredit: { method: getMyCareerredit, reduce: 'getMyCareerredit'},
  getMyCareerreditDetail: { method: getMyCareerreditDetail, reduce: 'getMyCareerreditDetail' },
  getMyCareerAbility: { method: getMyCareerAbility, reduce: 'getMyCareerAbility' },
  getMyCareerAbilityDetail: { method: getMyCareerAbilityDetail, reduce: 'getMyCareerAbilityDetail' },
  getMyCareerInterest: { method: getMyCareerInterest, reduce: 'getMyCareerInterest' },
  getMyCareerInterestDetail: { method: getMyCareerInterestDetail, reduce: 'getMyCareerInterestDetail' },
  getMyScoreRank: { method: getMyScoreRank, reduce: 'getMyScoreRank' },
  // 生涯活动记录
  getMyActivityList: { method: getMyActivityList, reduce: 'getMyActivityList' },
  // 家族树
  familyTree: { method: familyTree, reduce: 'familyTree' },
}

export default {
  namespace: 'parentsArchives',
  state: {
    // 生涯评估
    careeredit: {},
    careerreditDetail: {},
    careerAbility: {},
    careerAbilityDetail: {},
    careerInterest: {},
    careerInterestDetail: {},
    scoreRank: {},
    // 生涯活动记录
    activityList: {},
    // 家族树
    familyTree: {}
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
    // 生涯评估
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
    getMyCareerAbilityDetail(state, action) {
      return {
        ...state,
        careerAbilityDetail: action.payload,
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
    getMyScoreRank(state, action) {
      return {
        ...state,
        scoreRank: action.payload,
      }
    },
    // 生涯活动记录
    getMyActivityList(state, action) {
      return {
        ...state,
        activityList: action.payload,
      }
    },
    // 家族树
    familyTree(state, action) {
      return {
        ...state,
        familyTree: action.payload,
      }
    }
  }
}
