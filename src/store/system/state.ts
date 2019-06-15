export interface SystemState {
  loggedIn: boolean;
  user: firebase.UserInfo | undefined;
}

export const systemInitialState: SystemState = {
  loggedIn: false,
  user: undefined,
}