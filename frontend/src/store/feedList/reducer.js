import types from "./types";

const initialState = {
	list: [],
	mapList: [],
	mapCenter: null,
	currentPage: null,
	nextPage: 1,
	isLoading: false,
	isFiltered: false,
}

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.ADD_TO_FEED:
			return {...state, list: [...state.list, ...action.payload]}

		case types.SAVE_MAP_FEED:
			return {...state, mapList: action.payload}

		case types.SAVE_MAP_CENTER:
			return {...state, mapCenter: action.payload}

		case types.SET_NEXT_PAGE: 
			return {...state,	nextPage: action.payload}
		
		case types.SET_PAGE: 
			return {...state, currentPage: action.payload}
		
		case types.SET_IS_LOADING: 
			return {...state, isLoading: action.payload}
		
		case types.SET_IS_FILTERED: 
			return {...state, isFiltered: action.payload}
		
		case types.SET_NEW_EVENTS: 
			return {...state, list: action.payload}
		
		case types.RESET_DATA: 
			return {...initialState}

		default: {
			return state;
		}
	}
}