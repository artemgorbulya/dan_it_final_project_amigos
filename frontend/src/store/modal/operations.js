import actions from './actions';

const toggleBurgerMenuOperation = (value) => (dispatch) =>{
    dispatch(actions.toggleBurgerMenuAction(value));
};

const toggleModalOperation = (value) => (dispatch) =>{
    const body = document.querySelector('body');
    body.style.overflow = value ? 'hidden' : 'auto';
    dispatch(actions.toggleModalAction(value));
};

const toggleAlertOperation = (value) => (dispatch) =>{
    dispatch(actions.toggleAlertAction(value));
};

export default {
    toggleBurgerMenuOperation,
    toggleModalOperation,
    toggleAlertOperation
}

