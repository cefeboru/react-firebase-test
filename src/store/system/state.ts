export interface SystemState {
  loggedIn: boolean;
  user: firebase.UserInfo | undefined;
  logInError: firebase.FirebaseError | undefined;
}

export const systemInitialState: SystemState = {
  loggedIn: false,
  user: undefined,
  logInError: undefined,
};