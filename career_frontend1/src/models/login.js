// import { routerRedux } from 'dva/router';
// import { stringify } from 'qs';
import { getFakeCaptcha } from '@/services/api';
import { getTicket, typeLogin, getUserMessage } from '@/services/common/user';
import { setAuthority } from '@/utils/authority';
// import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload, callback }, { call, put }) {
      const response = yield call(getTicket, payload);
      // 如果只有一个身份，去登录成功
      if(response && response.data.UserInfo.length === 1 ) {
        const data = {
          status: 'ok',
          type: 'account',
          currentAuthority: response.data.UserInfo[0].UserType.Name,
        }
        yield put({
          type: 'changeLoginStatus',
          payload: data,
        });
        window.localStorage.setItem('token', response.data.UserInfo[0].Token);
        if(response.data.UserInfo[0].StudentInfo) {
          callback(response);
          return;
        }
        yield put({
          type: 'loginSuccess'
        })
      } else if(callback) callback(response)
    },

    *typeLogin({ payload }, { call, put }) {
      const response = yield call(typeLogin, payload);
      if(response.ok === "4000") {
        window.localStorage.setItem('token', response.data.Token);
        const data = {
          status: 'ok',
          type: 'account',
          currentAuthority: response.data.UserType.Name,
        }
        yield put({
          type: 'changeLoginStatus',
          payload: data,
        });
        yield put({
          type: 'loginSuccess'
        })
      }
    },

    *loginSuccess(_, { call }) {
      reloadAuthorized();
      const response = yield call(getUserMessage);
      const name = response.data.UserType.Name;
      const { origin } = window.location;
      // 不同角色登录，指向不同的首页
      switch(name) {
        case 'student':
          window.location.href = `${origin}/front/evaluation`;
          break;
        case 'parents':
          window.location.href = `${origin}/front/archives`;
          break;
        case 'teacher':
          window.location.href = `${origin}/front/grade-report`;
          break;
        case 'headTeacher':
          window.location.href = `${origin}/front/class-report`
          break;
        case 'school':
          window.location.href = `${origin}/front/school-index`;
          break;
        default:
          break;
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      window.localStorage.removeItem('token')
      yield put(
        // TODO 退出登录重定向页面
        window.location.href = 'https://www.baidu.com'
      )
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
