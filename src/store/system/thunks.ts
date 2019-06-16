import FirebaseApp from '../../modules/FirebaseApp';
import { saveUserData, updateSignInError, cleanUserData, saveAccessToken } from './actions';
import { Dispatch } from 'redux';
import { thunkGetRecommendedVideos } from '../videos/thunks';
import { AppState } from '..';

export const thunkSignIn = () => async (dispatch: Dispatch, getState: () => AppState) => {
  try {
    const asyncResp = await FirebaseApp.doSignInWithGoogle();
    const credential = JSON.parse(JSON.stringify(asyncResp.credential));
    if (!asyncResp.user || !asyncResp.credential) {
      return;
    }
    await sessionStorage.setItem('user', JSON.stringify(asyncResp.user));
    await sessionStorage.setItem('oauthAccessToken', credential.oauthAccessToken);
    dispatch(saveUserData(asyncResp.user));
    dispatch(saveAccessToken(credential.oauthAccessToken));
    return thunkGetRecommendedVideos()(dispatch, getState);
  } catch (err) {
    dispatch(updateSignInError(err.message));
  }
};

export const thunkSignOut = () => async (dispatch: Dispatch) => {
  try {
    await sessionStorage.removeItem('user');
    await sessionStorage.removeItem('oauthAccessToken');
    await FirebaseApp.doSignOut();
    dispatch(cleanUserData());
  } catch (error) {
    console.error(error);
  }
};

export const thunkLoadUserFromStorage = () => async (dispatch: Dispatch, getState: () => AppState) => {
  try {
    const user = await sessionStorage.getItem('user');
    const oauthAccessToken = await sessionStorage.getItem('oauthAccessToken');
    if (user) dispatch(saveUserData(JSON.parse(user)));
    if (oauthAccessToken) dispatch(saveAccessToken(oauthAccessToken));
    return thunkGetRecommendedVideos()(dispatch, getState);
  } catch (error) {
    console.error(error);
  }
};