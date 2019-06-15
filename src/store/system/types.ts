import { SystemState } from './state';

export const SAVE_USER_DATA = 'system/SAVE_USER_DATA';
export const CLEAN_USER_DATA = 'system/CLEAN_USER_DATA';

interface SaveUserAction {
  type: typeof SAVE_USER_DATA;
  payload: firebase.UserInfo;
}

interface CleanUserData {
  type: typeof CLEAN_USER_DATA;
}

export type SystemActionsType = SaveUserAction | CleanUserData;