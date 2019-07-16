import { DISPLAY_INDUSTRIES, DISPLAY_COUNTRIES } from "../actions/types";

const initialState = {
    industries: [],
    countries: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case DISPLAY_INDUSTRIES:
            return{
                ...state,
                industries: action.payload 
            };
        case DISPLAY_COUNTRIES:
            return {
                ...state,
                countries: action.payload
            };
        default:
            return state;
    }
}