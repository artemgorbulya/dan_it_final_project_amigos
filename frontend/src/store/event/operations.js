import actions from './actions';

const getCurrentEventOperation = (eventId) => (dispatch) =>{
    dispatch(actions.getCurrentEventAction(eventId));
};

const getCurrentUserOperation = (userId) => (dispatch) =>{
    dispatch(actions.getCurrentUserAction(userId));
};


export default {
    getCurrentEventOperation,
    getCurrentUserOperation,
}

