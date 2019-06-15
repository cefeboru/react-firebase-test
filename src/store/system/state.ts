export interface SystemState {
    loggedIn: boolean;
    user: firebase.User | undefined;
    userName: string;
}

export const initialState : SystemState = {
    loggedIn: false,
    user: undefined,
    userName: "",
}