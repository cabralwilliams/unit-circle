import { UPDATE_TIME, RESET_TIME, SET_MODE, RESET_DEFAULTS, LOAD_BUTTONS } from "./actions";

const initialState = {
    timeLeft: 120000,
    gameMode: null,
    buttonValues: []
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
        case LOAD_BUTTONS:
            return { ...state, buttonValues: action.buttonValues };
        default:
            return state;
    }
};

export default reducer;