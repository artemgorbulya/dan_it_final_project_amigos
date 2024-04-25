import types  from './types';

const toggleIsAuthAction = (isAuth) => ({
    type: types.TOGGLE_IS_AUTH,
    payload: isAuth
});

const dataUserAction = (dataUser) => ({
    type: types.DATA_USER,
    payload: dataUser
});

const tokenAction = (token) => ({
    type: types.TOKEN,
    payload: token
});

const setEvents = (events) => ({
    type: types.SET_EVENTS,
    payload: events
});

const isSubmitClickAction = (isSubmitClick) => ({
    type: types.IS_SUBMIT_CLICK,
    payload: isSubmitClick
});

const  isPhotoredactorOpenAction = (isPhotoredactorOpen) =>({
    type: types.IS_PHOTOREDACTOR_OPEN,
    payload: isPhotoredactorOpen
});

const  isChangeUserOpenAction = (isChangeUserOpen) =>({
    type: types.IS_CHANGE_USER_OPEN,
    payload: isChangeUserOpen
});

const subscribeEventAction = (events) => ({
    type: types.SUBSCRIBE_EVENT,
    payload: events
});

const unSubscribeEventAction = (requestEventObj) => ({
    type: types.UN_SUBSCRIBE_EVENT,
    payload: requestEventObj
});

const setUsersOnline = (usersOnline) => ({
    type: types.USERS_ONLINE,
    payload: usersOnline,
})


export default {
    toggleIsAuthAction,
    dataUserAction,
    tokenAction,
    setEvents,
    isSubmitClickAction,
    isChangeUserOpenAction,
    isPhotoredactorOpenAction,
    subscribeEventAction,
    unSubscribeEventAction,
    setUsersOnline
};