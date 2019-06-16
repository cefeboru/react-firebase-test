export interface SystemState {
  loggedIn: boolean;
  user: firebase.UserInfo | undefined;
  logInError: string | undefined;
  accessToken: string | undefined;
}

export const systemInitialState: SystemState = {
  loggedIn: false,
  user: undefined,
  logInError: undefined,
  accessToken: undefined,
};