export interface SystemState {
  loggedIn: boolean;
  user: firebase.UserInfo | undefined;
}

export const initialState: SystemState = {
  loggedIn: false,
  user: undefined,
}