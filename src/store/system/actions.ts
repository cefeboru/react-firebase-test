import { createAction } from "redux-actions";
import { SAVE_USER_DATA, CLEAN_USER_DATA } from "./types";

export const saveUserData = createAction<firebase.User>(SAVE_USER_DATA);

export const cleanUserData = createAction(CLEAN_USER_DATA);

export type ActionsType = typeof saveUserData | typeof cleanUserData;