import types  from './types';


 const toggleBurgerMenuAction = (isOpen) => ({
    type: types.TOGGLE_BURGER_MENU,
    payload: isOpen

});

 const toggleModalAction = (isOpen) => ({
    type: types.TOGGLE_MODAL,
    payload: isOpen
});

 const toggleAlertAction = (isOpen) => ({
    type: types.TOGGLE_ALERT,
    payload: isOpen
});

 export default {
     toggleBurgerMenuAction,
     toggleModalAction,
     toggleAlertAction
 }

