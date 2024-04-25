import actions from './actions';
// import axios from "axios";

const toggleIsAuthOperation = value => dispatch => {
    dispatch(actions.toggleIsAuthAction(value));
};

const dataUserOperation = value => dispatch => {
    dispatch(actions.dataUserAction(value));
};

const tokenOperation = value => dispatch => {
    dispatch(actions.tokenAction(value));
};

const isSubmitClickOperation = value => dispatch => {
    dispatch(actions.isSubmitClickAction(value));
};

const isChangeUserOpenOperation = value => dispatch => {
    dispatch(actions.isChangeUserOpenAction(value));
};

const isPhotoredactorOpenOperation = value => dispatch => {
    dispatch(actions.isPhotoredactorOpenAction(value));
};

const setUsersOnlineOperation = value => dispatch => {
    dispatch(actions.setUsersOnline(value));
}

const addEvent = event => (dispatch, getState) => {
    const { user } = getState();
    const { dataUser } = user;
    const { events } = dataUser;
    dispatch(actions.setEvents([...events, event]));
};

const deleteEvent = event => (dispatch, getState) => {
    const { user } = getState();
    const { dataUser } = user;
    const { events } = dataUser;
    dispatch(actions.setEvents(events.filter(item => item._id !== event._id)));
};


const rewriteToken = token => (dispatch) => {

    localStorage.setItem('token', token);

    dispatch(actions.tokenAction(token));
    dispatch(actions.toggleIsAuthAction(true));

    // const { data } = await axios.get('/api/users/');
    // dispatch(actions.dataUserAction(data.data));
};

const removeToken = () => dispatch => {
    localStorage.removeItem('token');

    dispatch(actions.tokenAction(''));
    dispatch(actions.toggleIsAuthAction(false));
    dispatch(actions.dataUserAction({}));
};

const changeEventContentOperation = event => (dispatch, getState) => {
    const { user } = getState();
    const { dataUser } = user;
    const { events } = dataUser;
    const eventIndex = events.findIndex(item => item._id === event._id);
    events.splice(eventIndex, 1, event);

    dispatch(actions.setEvents(events));
};

const subscribeEventOperation = event => (dispatch, getState) => {
    const { user } = getState();
    const { dataUser } = user;
    const { sentEvents } = dataUser;

    dispatch(actions.subscribeEventAction([...sentEvents, event]));
};

const unSubscribeEventOperation = event => (dispatch, getState) => {
    const { user } = getState();
    const { dataUser } = user;
    const { sentEvents, appliedEvents } = dataUser;

    dispatch(actions.unSubscribeEventAction({
        sent: sentEvents.filter(item => item._id !== event._id),
        applied: appliedEvents.filter(item => item._id !== event._id)
    }));

};

export default {
    toggleIsAuthOperation,
    dataUserOperation,
    tokenOperation,
    addEvent,
    rewriteToken,
    removeToken,
    deleteEvent,
    isSubmitClickOperation,
    isChangeUserOpenOperation,
    isPhotoredactorOpenOperation,
    changeEventContentOperation,
    subscribeEventOperation,
    unSubscribeEventOperation,
    setUsersOnlineOperation
}

