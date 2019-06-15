import { handleActions } from 'redux-actions';
import { SystemState, systemInitialState } from './state';
import { SAVE_USER_DATA, CLEAN_USER_DATA  } from './types';
import { ActionsPayloadType } from './actions';

export const systemRecuder = handleActions<SystemState, ActionsPayloadType>(
  {
    [SAVE_USER_DATA]: (state, action) => {
      const newUser = action.payload as firebase.UserInfo;
      return {
        ...state,
        user: newUser,
        loggedIn: true,
      };
    },
    [CLEAN_USER_DATA]: (state) => {
      return {
        loggedIn: false,
        user: undefined,
      };
    },
  },
  systemInitialState);