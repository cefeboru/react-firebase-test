import { handleActions, handleAction } from "redux-actions";
import { ActionsType, saveUserData } from "./actions";
import { SystemState, initialState } from "./state";
import { SAVE_USER_DATA, CLEAN_USER_DATA } from "./types";

export const systemRecuder = handleActions<SystemState, ActionsType>({
    [SAVE_USER_DATA]: (state, action) => {
        action.payload
        return state;
    },
    [CLEAN_USER_DATA]: (state) => {
        return state;
    }
}, initialState);