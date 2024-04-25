import types from "./types";
const dataUser = JSON.parse(localStorage.getItem('dataUser'));

const initialState = {
    isAuth: localStorage.getItem('isAuth') || false,
    userId: dataUser?._id || null,
    dataUser: dataUser || {},
    token: localStorage.getItem('token') ||'',
    isSubmitClick: false,
    isChangeUserOpen: false,
    isPhotoredactorOpen: false,
    usersOnline: [],
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.TOGGLE_IS_AUTH:
            return {...state, isAuth: action.payload};
        case types.DATA_USER:
            return {...state, dataUser: action.payload, userId: action.payload._id};
        case types.TOKEN:
            return {...state, token: action.payload};
        case types.SET_EVENTS:
            return {...state, dataUser: { ...state.dataUser, events: action.payload}};
        case types.IS_SUBMIT_CLICK:
            return {...state, isSubmitClick: action.payload};
        case types.IS_CHANGE_USER_OPEN:
            return {...state, isChangeUserOpen: action.payload};
        case types.IS_PHOTOREDACTOR_OPEN:
            return {...state, isPhotoredactorOpen: action.payload};
        case types.SUBSCRIBE_EVENT:
            return {...state, dataUser: { ...state.dataUser, sentEvents: action.payload}};
        case types.UN_SUBSCRIBE_EVENT:
            return {...state, dataUser: { ...state.dataUser, sentEvents: action.payload.sent, appliedEvents: action.payload.applied}};
        case types.USERS_ONLINE:
            return {...state, usersOnline: action.payload};
        default:
            return state;
    }
};