import { Reducer } from 'redux';
import { routerRedux } from 'dva/router';
import { Effect } from 'dva';
import { stringify } from 'querystring';
import Cookie from 'js-cookie';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import { getPageQuery } from '@/utils/utils';
import { queryCurrent } from '@/services/user';

export interface StateType {
  status?: 'success' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    getCaptcha: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      const responseData = {
        currentAuthority: 'admin',
        status: 'error',
        type: 'account',
        message: '',
      };

      // Login successfully
      if (response && response.code === 0) {
        responseData.status = 'success';
        yield put({
          type: 'changeLoginStatus',
          payload: responseData,
        });
        Cookie.set("namespace", response.data.namespaces[0]);
        Cookie.set("username", response.data.username);
        Cookie.set("email", response.data.email);
        localStorage.setItem('authorization', response.data.token);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('email', response.data.email);

        var info = localStorage.getItem('info')
        if(info === '' || info == null || info == undefined || info === 'undefined'){
          const responseUser = yield call(queryCurrent);
          localStorage.setItem('info', JSON.stringify(responseUser.data));
          yield put({
            type: 'user/saveCurrentUser',
            payload: responseUser.data,
          });
        }else{
          yield put({
            type: 'user/saveCurrentUser',
            payload: JSON.parse(info),
          });
        }

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        reloadAuthorized();
        yield put(routerRedux.replace(redirect || '/'));
      } else {
        responseData.message = response.error;
        yield put({
          type: 'changeLoginStatus',
          payload: responseData,
        });
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
    *logout(_, { put }) {
      Cookie.set("username", "");
      Cookie.set("email", "");
      Cookie.set("authorization", "");
      localStorage.setItem('authorization', "");
      localStorage.setItem('username', "");
      localStorage.setItem('email', "");


      try {
        const { redirect } = getPageQuery();
        // redirect
        if (window.location.pathname !== '/user/login' && !redirect) {
          yield put(
            routerRedux.replace({
              pathname: '/user/login',
              search: stringify({
                redirect: window.location.href,
              }),
            }),
          );
        }
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }

      window.location.reload();
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
        message: payload.message
      };
    },
  },
};

export default Model;
