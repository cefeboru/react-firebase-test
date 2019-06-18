export interface SystemState {
  loggedIn: boolean;
  user: firebase.UserInfo;
  logInError: string | undefined;
  accessToken: string | undefined;
}

export const systemInitialState: SystemState = {
  loggedIn: false,
  user: {} as any,
  logInError: undefined,
  accessToken: undefined,
};