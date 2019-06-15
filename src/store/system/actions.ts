import { SAVE_USER_DATA, CLEAN_USER_DATA, UPDATE_SIGN_IN_ERROR } from './types';
import { createAction } from 'redux-actions';

export const saveUserData = createAction<firebase.User>(SAVE_USER_DATA);
export const cleanUserData = createAction(CLEAN_USER_DATA);
export const updateSignInError = createAction<firebase.FirebaseError>(UPDATE_SIGN_IN_ERROR);

export type ActionsPayloadType = firebase.User | undefined | firebase.FirebaseError;
