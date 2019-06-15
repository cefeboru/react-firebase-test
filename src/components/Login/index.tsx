import React from 'react';
import style from './login.module.scss';
import GoogleButton from 'react-google-button';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { thunkSignIn, thunkSignOut } from '../../store/system/thunks';

export interface LoginProps {
  user: firebase.UserInfo | undefined;
  signOut: any;
  signIn: any;
  error: firebase.FirebaseError | undefined;
}

// Use it as a HOC to protect the whole application
export const Login: React.FC<LoginProps> = ({ user, signOut, signIn, error, children }) => {
  if (user) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  return (
        <div className={style.login}>
            <div className={style.content}>
                {
                    user
                    ? <GoogleButton label='Log out' onClick={signOut} />
                    : <GoogleButton onClick={signIn} />
                }
                {
                    error && <div className={style.error}>{error}</div>
                }
            </div>
        </div>
  );
};

function mapStateToProps(state: AppState) {
  return {
    user: state.system.user,
    error: state.system.logInError,
  };
}

export default connect(
  mapStateToProps,
  {
    signIn: thunkSignIn,
    signOut: thunkSignOut,
  },
)(Login);