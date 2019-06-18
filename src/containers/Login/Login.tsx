import React from 'react';
import style from './Login.module.scss';
import GoogleButton from 'react-google-button';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { thunkSignIn, thunkSignOut, thunkMaybeLoadUserFromStorage } from '../../store/system/thunks';

export interface LoginProps {
  user: firebase.UserInfo | undefined;
  loadUserFromStorage: any;
  signOut: any;
  signIn: any;
  error: string | undefined;
  loggedIn: boolean;
}

export class Login extends React.Component<LoginProps> {

  componentDidMount() {
    this.props.loadUserFromStorage();
  }

  render() {
    const { signIn, error, children, loggedIn } = this.props;
    return (
    <React.Fragment>
      {
        loggedIn
          ? <React.Fragment>{children}</React.Fragment>
          : <div className={style.login}>
              <div className={style.content}>
                <GoogleButton onClick={signIn} />
              </div>
              {
                error && <div className={`${style.error} ${style.content}`}>{error}</div>
              }
            </div>
      }
    </React.Fragment>);
  }
}

function mapStateToProps(state: AppState) {
  return {
    user: state.system.user,
    error: state.system.logInError,
    loggedIn: state.system.loggedIn,
  };
}

export default connect(
  mapStateToProps,
  {
    signIn: thunkSignIn,
    signOut: thunkSignOut,
    loadUserFromStorage: thunkMaybeLoadUserFromStorage,
  },
)(Login);