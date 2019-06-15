import { handleActions } from 'redux-actions';
import { SystemState, systemInitialState } from './state';
import { SAVE_USER_DATA, CLEAN_USER_DATA, UPDATE_SIGN_IN_ERROR  } from './types';
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
    [CLEAN_USER_DATA]: () => {
      return {
        logInError: undefined,
        loggedIn: false,
        user: undefined,
      };
    },
    [UPDATE_SIGN_IN_ERROR]: (state, action) => {
      const error = action.payload as firebase.FirebaseError;
      return {
        ...state,
        loggedIn: false,
        logInError: error,
      };
    },
  },
  systemInitialState);