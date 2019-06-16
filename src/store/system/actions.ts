import { SAVE_USER_DATA, CLEAN_USER_DATA, UPDATE_SIGN_IN_ERROR, SAVE_ACCESS_TOKEN } from './types';
import { createAction } from 'redux-actions';

export const saveUserData = createAction<firebase.User>(SAVE_USER_DATA);
export const cleanUserData = createAction(CLEAN_USER_DATA);
export const updateSignInError = createAction<firebase.FirebaseError>(UPDATE_SIGN_IN_ERROR);
export const saveAccessToken = createAction<string>(SAVE_ACCESS_TOKEN);

export type ActionsPayloadType = firebase.User | undefined | firebase.FirebaseError | string;
