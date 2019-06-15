import { handleActions } from 'redux-actions';
import { ActionsPayloadTypes } from './actions';
import { SystemState, initialState } from './state';
import { SAVE_USER_DATA, CLEAN_USER_DATA, SystemActionsType } from './types';

export const systemRecuder = handleActions<SystemState, ActionsPayloadTypes>(
  {
    [SAVE_USER_DATA]: (state, action) => {
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
      };
    },
    [CLEAN_USER_DATA]: (state) => {
      return state;
    },
  },
  initialState);