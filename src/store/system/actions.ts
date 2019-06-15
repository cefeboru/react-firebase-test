import { createAction, Action } from 'redux-actions';
import { SAVE_USER_DATA, CLEAN_USER_DATA } from './types';

export const saveUserData = createAction<firebase.UserInfo>(SAVE_USER_DATA);
export const cleanUserData = createAction(CLEAN_USER_DATA);

export type ActionsPayloadTypes = firebase.UserInfo;
