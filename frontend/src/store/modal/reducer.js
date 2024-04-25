import types from './types';

const initialState = {
    isModalOpen: false,
    isBurgerMenuOpen: false,
    isAlertOpen: false,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.TOGGLE_BURGER_MENU:
            return { ...state, isBurgerMenuOpen: action.payload};
        case types.TOGGLE_MODAL:
            return { ...state, isModalOpen: action.payload };
        case types.TOGGLE_ALERT:
            return { ...state, isAlertOpen: action.payload };
        default:
            return state;
    }
};

