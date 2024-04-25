import types  from './types';


 const getCurrentEventAction = (eventId) => ({
    type: types.GET_CURRENT_EVENT,
    payload: eventId

});

 const getCurrentUserAction = (userId) => ({
    type: types.GET_CURRENT_USER,
    payload: userId

});


 export default {
     getCurrentEventAction,
     getCurrentUserAction,
 }

