import { isResOK } from '@/utils/BizUtil';
import {
  getMajorDetail,
  schoolList,
  getSelectSchool,
  getProfessionType,
  getProfession,
  getClass,
  getSignalProfession,
  addProfession,
  editProfession,
  delProfession,
}from '@/services/common/professionSchool';

const servToReduce = {
  getMajorDetail: { method: getMajorDetail, reduce: 'getMajorDetail' },  // 专业详情
  schoolList: { method: schoolList, reduce: 'schoolList' },  // 学科
  typeList: { method: schoolList, reduce: 'typeList' },   // 分类
  majorList: { method: schoolList, reduce: 'majorList' }, // 专业
  getSelectSchool: { method: getSelectSchool, reduce: 'getSelectSchool' },  // 关联学校
  getProfessionType: { method: getProfessionType, reduce: 'getProfessionType' },
  getProfession: { method: getProfession, reduce: 'getProfession' },
  getClass: { method: getClass, reduce: 'getClass' },
  getSignalProfession: { method: getSignalProfession, reduce: 'getSignalProfession' },
  addProfession: { method: addProfession, reduce: null },
  editProfession: { method: editProfession, reduce: null },
  delProfession: { method: delProfession, reduce: null },
}

export default {
  namespace: 'professionSchool',
  state: {
    majorDetail: null,
    schoolList: null,
    typeList: null,
    majorList: null,
    selectSchool: null,
    professionType: null,
    profession: null,
    getClass: null,
    signalProfession: null,
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
    typeList(state, action) {
      return {
        ...state,
        typeList: action.payload
      }
    },
    majorList(state, action) {
      return {
        ...state,
        majorList: action.payload
      }
    },
    getSelectSchool(state, action) {
      return {
        ...state,
        selectSchool: action.payload
      }
    },
    getProfession(state, action) {
      return {
        ...state,
        profession: action.payload,
      };
    },
    getProfessionType(state, action) {
      const data = [];
      action.payload.map(item => {
        if(item.ParentsId === 0) {
          data.push({id: item.Id, label: item.Name, value: item.Name, parentId: item.ParentsId, isLeaf: false})
        } else {
          data.push({id: item.Id, label: item.Name, value: item.Name, parentId: item.ParentsId, isLeaf: true})
        }
      })
      return {
        ...state,
        professionType: data,
      };
    },
    getClass(state, action) {
      const data = []
      action.payload.map(item => {
        if(item.ParentsId === 0) {
          data.push({id: item.Id, label: item.Name, value: item.Name, parentId: item.ParentsId, isLeaf: false})
        } else {
          data.push({id: item.Id, label: item.Name, value: item.Name, parentId: item.ParentsId, isLeaf: true})
        }
      })
      return {
        ...state,
        getClass: data,
      };
    },
    getSignalProfession(state, action) {
      return {
        ...state,
        signalProfession: action.payload,
      };
    },
  }
}
