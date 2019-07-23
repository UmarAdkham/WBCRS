import { DISPLAY_OBLIGORS } from "../actions/types";

const initialState = {
    obligors: [],
    questions: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case DISPLAY_OBLIGORS:
            return{
                ...state,
                obligors: action.payload
            };   
        default:
            return state;
    }
}