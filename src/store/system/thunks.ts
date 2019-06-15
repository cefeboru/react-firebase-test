import FirebaseApp from '../../modules/FirebaseApp';
import { saveUserData, updateSignInError, cleanUserData } from './actions';
import { Dispatch } from 'redux';

export const thunkSignIn = () => async (dispatch: Dispatch) => {
  try {
    const asyncResp = await FirebaseApp.doSignInWithGoogle();
    if (asyncResp.user) {
      dispatch(saveUserData(asyncResp.user));
    }
  } catch (err) {
    dispatch(updateSignInError(err));
  }
};

export const thunkSignOut = () => async (dispatch: Dispatch) => {
  try {
    await FirebaseApp.doSignOut();
    dispatch(cleanUserData());
  } catch (error) {
    console.error(error);
  }
};