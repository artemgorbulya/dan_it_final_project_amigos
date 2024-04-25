import types from './types';


const initialState = {
    currentEvent: null,
    currentUser: null,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_CURRENT_EVENT:
            return { ...state, currentEvent: action.payload};
        case types.GET_CURRENT_USER:
            return { ...state, currentUser: action.payload};
        default:
            return state;
    }
};

