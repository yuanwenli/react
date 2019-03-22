import { isResOK } from '@/utils/BizUtil';
import {
  addFirst,
  addSecond,
  addThird,
  preview,
  openQuestionnaire,
  questionnaireList,
  delQuestionnaire,
} from '@/services/common/questionnaireManage';

const servToReduce = {
  addFirst: { method: addFirst, reduce: null },
  addSecond: { method: addSecond, reduce: null },
  addThird: { method: addThird, reduce: null },
  preview: { method: preview, reduce: 'preview' },
  openQuestionnaire: { method: openQuestionnaire, reduce: null },
  questionnaireList: { method: questionnaireList, reduce: 'questionnaireList' },
  delQuestionnaire: { method: delQuestionnaire, reduce: null },
}

export default {
  namespace: 'questionnaireManage',
  state: {
    preview: null,
    questionnaireList: null,
  },
  effects: {
    * reqCommon({ service, payload, callback }, { call, put }) {
      const postParamObj = servToReduce[service];
      const response = yield call(postParamObj.method, payload);
      if (isResOK(response)) {
        const { reduce } = postParamObj;
        if (response.data) {
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
    },
  },
  reducers: {
    preview(state, action) {
      return {
        ...state,
        preview: action.payload,
      }
    },
    questionnaireList(state, action) {
      return {
        ...state,
        questionnaireList: action.payload,
      }
    }
  },
};
