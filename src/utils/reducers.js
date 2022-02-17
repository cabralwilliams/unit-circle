import { UPDATE_TIME, RESET_TIME, SET_MODE, RESET_DEFAULTS } from "./actions";

const initialState = {
    timeLeft: 120000,
    gameMode: null
}

const reducer = (state, action) => {
    switch(action.type) {
        case UPDATE_TIME:
            return { ...state, timeLeft: action.timeLeft };
        case RESET_TIME:
            return { ...state, timeLeft: 120000 };
        case SET_MODE:
            return { ...state, gameMode: action.gameMode };
        case RESET_DEFAULTS:
            return { initialState };
        default:
            return state;
    }
};

export default reducer;