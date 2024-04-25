import types from "./types";

const initialState = {
    isLoading: false,
    data: []
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CATEGORIES_LOADING:
            return {...state, isLoading: action.payload};
        case types.CATEGORIES_SAVE:
            return {...state, data: action.payload};
        default:
            return state;
    }
}
