import FirebaseApp from '../../modules/FirebaseApp';
import { saveUserData, updateSignInError, cleanUserData, saveAccessToken } from './actions';
import { Dispatch } from 'redux';

export const thunkSignIn = () => async (dispatch: Dispatch) => {
  try {
    const asyncResp = await FirebaseApp.doSignInWithGoogle();
    const credential = JSON.parse(JSON.stringify(asyncResp.credential));
    if (asyncResp.user && asyncResp.credential) {
      sessionStorage.setItem('user', JSON.stringify(asyncResp.user));
      sessionStorage.setItem('oauthAccessToken', credential.oauthAccessToken);
      dispatch(saveUserData(asyncResp.user));
      dispatch(saveAccessToken(credential.oauthAccessToken));
    }
  } catch (err) {
    dispatch(updateSignInError(err));
  }
};

export const thunkSignOut = () => async (dispatch: Dispatch) => {
  try {
    await FirebaseApp.doSignOut();
    await sessionStorage.removeItem('user');
    await sessionStorage.removeItem('oauthAccessToken');
    dispatch(cleanUserData());
  } catch (error) {
    console.error(error);
  }
};

export const thunkLoadUserFromStorage = () => async (dispatch: Dispatch) => {
  try {
    const user = await sessionStorage.getItem('user');
    const oauthAccessToken = await sessionStorage.getItem('oauthAccessToken');
    if (user) dispatch(saveUserData(JSON.parse(user)));
    if (oauthAccessToken) dispatch(saveAccessToken(oauthAccessToken));
  } catch (error) {
    console.error(error);
  }
};