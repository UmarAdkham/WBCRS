import { DISPLAY_SCORECARDS, DISPLAY_QUESTIONS, DISPLAY_OPTIONS, DISPLAY_MODELS } from "../actions/types";

const initialState = {
    scorecards: [],
    models: [],
    questions: [],
    options: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case DISPLAY_SCORECARDS:
            return {
                ...state,
                scorecards: action.payload 
            };
        case DISPLAY_MODELS:
            return {
                ...state,
                models: action.payload 
            };
        case DISPLAY_QUESTIONS:
            return {
                ...state,
                questions: action.payload 
            };
        case DISPLAY_OPTIONS:
            return {
                ...state,
                options: action.payload
            }
        default:
            return state;
    }
}