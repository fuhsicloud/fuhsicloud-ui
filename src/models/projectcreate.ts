import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { fakeSubmitProjectForm } from '../services/project';

export interface StateType {
  current?: string;
  step?: {
    namespace: string;
    receiverAccount: string;
    project_name_en: string;
    desc: string;
    portNum: string;
    gitType: string;
    GitPath: string;
    GitVersion: string;
    addPort: string;
    jarCommand: string;
    tomcatCommand: string;
    image: string;
    deploymentInfo: string;
    language: string;
  };

}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submitStepForm: Effect;
  };
  reducers: {
    saveStepFormData: Reducer<StateType>;
    saveCurrentStep: Reducer<StateType>;
    showBuildModal: Reducer<StateType>;
    hideBuildModal: Reducer<StateType>;
    showExtendModal: Reducer<StateType>;
    hideExtendModal: Reducer<StateType>;
    showExpansionModal: Reducer<StateType>;
    hideExpansionModal: Reducer<StateType>;
    changeProjectImage: Reducer<StateType>;
    changeImageLanguage: Reducer<StateType>;
    changeServiceStart: Reducer<StateType>;
    changeCupInfo: Reducer<StateType>;
    // saveConfigMap: Reducer<StateType>;
    // saveConfigMapData: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'appAndprojectAndcreate',

  state: {
    current: 'info',
    step: {
      namespace: 'default',
      receiverAccount: 'test@example.com',
      project_name_en: '',
      desc: '',
      portNum: '1',
      gitType: '',
      GitPath: '',
      GitVersion: '',
      addPort: '',
      jarCommand: '',
      tomcatCommand: '',
      image: '',
      deploymentInfo: '',
      language: '',
    },
  },

  effects: {
    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitProjectForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put({
        type: 'saveCurrentStep',
        payload: 'result',
      });
    },
  },

  reducers: {
    saveCurrentStep(state, { payload }) {
      return {
        ...state,
        current: payload,
      };
    },

    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...(state as StateType).step,
          ...payload,
        },
      };
    },

    //弹框控制展示及隐藏
    showBuildModal(state, { payload }) {
      return {
        ...state,
        buildModal: true,
        ...payload,
      };
    },
    hideBuildModal(state, { payload }) {
      return {
        ...state,
        buildModal: false,
        ...payload,
      };
    },
    showExtendModal(state, { payload }) {
      return {
        ...state,
        extendModal: true,
        ...payload,
      };
    },
    hideExtendModal(state, { payload }) {
      return {
        ...state,
        extendModal: false,
        ...payload,
      };
    },
    showExpansionModal(state, { payload }) {
      return {
        ...state,
        expansionModal: true,
        ...payload,
      };
    },
    hideExpansionModal(state, { payload }) {
      return {
        ...state,
        expansionModal: false,
        ...payload,
      };
    },
    changeProjectImage(state, { payload }) {
      var javaState = (payload.image.indexOf('java') == -1) ? false : true;
      return {
        ...state,
        image: payload.image,
        javaState: javaState,
        ...payload,
      };
    },
    changeImageLanguage(state, { payload }) {
      if (payload.image == 'java') {
        return {
          ...state,
          language: 'Java',
        };
      }
      if (payload.image == 'golang') {
        return {
          ...state,
          language: 'Golang',
        };
      }
      if (payload.image == 'nodejs') {
        return {
          ...state,
          language: 'NodeJs',
        };
      }
      if (payload.image == 'python') {
        return {
          ...state,
          language: 'Python',
        };
      }
      if (payload.image == 'nginx') {
        return {
          ...state,
          language: 'Nginx',
          ...payload,
        };
      }
      if (payload.image == 'static') {
        return {
          ...state,
          language: 'Static',
        };
      }
    },
    changeServiceStart(state, { payload }) {
      return {
        ...state,
        serviceStart: payload.serviceStart,
        ...payload,
      };
    },
    changeCupInfo(state, { payload }) {
      return {
        ...state,
        cpuHalfNum: payload.cpuHalfNum,
        ...payload,
      };
    },
    // saveConfigMap(state,action){
    //   return{
    //     ...state,
    //     configMapInfo: action.payload,
    //     ...action,
    //   }
    // },
    // saveConfigMapData(state,action){
    //   return{
    //     ...state,
    //     configMapDataList: action.payload.list,
    //     configMapDataPage: action.payload.page,
    //     ...action,
    //   }
    // },

  },
};

export default Model;
