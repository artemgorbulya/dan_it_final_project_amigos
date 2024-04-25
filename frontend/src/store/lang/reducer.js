import types from "./types";

const initialState = {
    lang: 'ru',
    langName: 'Русский'
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LANG:
            return {...state, lang: action.payload};
        case types.SET_LANG_NAME:
            return {...state, langName: action.payload};
        default:
            return state;
    }
}