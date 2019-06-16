import FirebaseApp from '../../modules/FirebaseApp';
import { saveUserData, updateSignInError, cleanUserData } from './actions';
import { Dispatch } from 'redux';

export const thunkSignIn = () => async (dispatch: Dispatch) => {
  try {
    const asyncResp = await FirebaseApp.doSignInWithGoogle();
    if (asyncResp.user && asyncResp.credential) {
      const credentials = asyncResp.credential as any;
      sessionStorage.setItem('user', JSON.stringify(asyncResp.user));
      sessionStorage.setItem('accessToken', credentials.accessToken);
      dispatch(saveUserData(asyncResp.user));
    }
  } catch (err) {
    dispatch(updateSignInError(err));
  }
};

export const thunkSignOut = () => async (dispatch: Dispatch) => {
  try {
    await FirebaseApp.doSignOut();
    await sessionStorage.removeItem('user');
    await sessionStorage.removeItem('accessToken');
    dispatch(cleanUserData());
  } catch (error) {
    console.error(error);
  }
};

export const thunkLoadUserFromStorage = () => async (dispatch: Dispatch) => {
  try {
    const user = await sessionStorage.getItem('user');
    if (user) {
      dispatch(saveUserData(JSON.parse(user)));
    }
  } catch (error) {
    console.error(error);
  }
};