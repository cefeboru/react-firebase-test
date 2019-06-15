import { SAVE_USER_DATA, CLEAN_USER_DATA } from './types';
import { createAction } from 'redux-actions';

export const saveUserData = createAction<firebase.UserInfo>(SAVE_USER_DATA);
export const cleanUserData = createAction(CLEAN_USER_DATA);

export type ActionsPayloadType = firebase.UserInfo | undefined;
