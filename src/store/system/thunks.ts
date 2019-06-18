import FirebaseApp from '../../modules/FirebaseApp';
import { saveUserData, updateSignInError, cleanUserData, saveAccessToken } from './actions';
import { Dispatch } from 'redux';
import { thunkGetRecommendedVideos, thunkLoadSavedForLaterVideos } from '../videos/thunks';
import { AppState } from '..';
import { push } from 'connected-react-router';

export const thunkSignIn = () => async (dispatch: Dispatch, getState: () => AppState) => {
  try {
    const asyncResp = await FirebaseApp.doSignInWithGoogle();
    const credential = JSON.parse(JSON.stringify(asyncResp.credential));
    if (!asyncResp.user || !asyncResp.credential) {
      return;
    }
    await sessionStorage.setItem('user', JSON.stringify(asyncResp.user));
    await dispatch(saveUserData(asyncResp.user));
    await sessionStorage.setItem('oauthAccessToken', credential.oauthAccessToken);
    await dispatch(saveAccessToken(credential.oauthAccessToken));
    await thunkGetRecommendedVideos()(dispatch, getState);
    await thunkLoadSavedForLaterVideos()(dispatch, getState);
    await dispatch(push('/'));
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

export const thunkMaybeLoadUserFromStorage = () => async (dispatch: Dispatch, getState: () => AppState) => {
  try {
    const user = await sessionStorage.getItem('user');
    const oauthAccessToken = await sessionStorage.getItem('oauthAccessToken');
    if (!user || !oauthAccessToken) return;
    await dispatch(saveUserData(JSON.parse(user)));
    await dispatch(saveAccessToken(oauthAccessToken));
    await thunkGetRecommendedVideos()(dispatch, getState);
    await thunkLoadSavedForLaterVideos()(dispatch, getState);
  } catch (error) {
    console.error(error);
  }
};