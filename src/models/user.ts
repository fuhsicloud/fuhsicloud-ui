import { Effect } from 'dva';
import { Reducer } from 'redux';

import { queryCurrent, query as queryUsers } from '@/services/user';

export interface CurrentUser {
  attrs?: string;
  city?: string;
  department?: string;
  email?: string;
  id?: number;
  namespaces?:string[];
  notifyCount?: number;
  openid?: string;
  phone?: string;
  roles?: {
    Permissions: string;
    created_at: string;
    description: string;
    id: number;
    level: number;
    name: string;
    state: number;
    updated_at: string;
 }[];
  state?: number;
  username?: string;
}

export interface UserModelState {
  currentUser?: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      var info = localStorage.getItem('info')
      if(info === '' || info == null || info == undefined || info === 'undefined'){
        const responseUser = yield call(queryCurrent);
        localStorage.setItem('info', JSON.stringify(responseUser.data));
        yield put({
          type: 'saveCurrentUser',
          payload: responseUser.data,
        });
      }else{
        yield put({
          type: 'saveCurrentUser',
          payload: JSON.parse(info),
        });
      }
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
