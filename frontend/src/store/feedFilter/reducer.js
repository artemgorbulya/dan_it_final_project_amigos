import types from "./types";

const initialState = {
	minAge: null,
	maxAge: null,
	languages: [],
	peopleWanted: [],
	categories: [],
}

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_MIN_AGE: {
			return {
				...state,
				minAge: action.payload,
			}
		}
		case types.SET_MAX_AGE: {
			return {
				...state,
				maxAge: action.payload,
			};
		}
		case types.SET_CITY: {
			return {
				...state,
				city: action.payload,
			}
		}
		case types.SET_DATE_START: {
			return {
				...state,
				dateStart: action.payload,
			}
		}
		case types.SET_LANGUAGES: {
			return {
				...state,
				languages: action.payload,
			}
		}
		case types.SET_PEOPLE_WANTED: {
			return {
				...state, 
				peopleWanted: action.payload
			}
		}
		case types.SET_CATEGORIES: {
			return {
				...state, 
				categories: action.payload
			}
		}
		case types.SET_ALL: {
			return {
				...state,
				...action.payload,
			}
		}
		case types.RESET_ALL: {
			return {
				...initialState,
			}
		}

		case types.DELETE_MIN_AGE: {
			return {
				...state,
				minAge: null,
			}
		}
		case types.DELETE_MAX_AGE: {
			return {
				...state,
				maxAge: null,
			}
		}
		case types.DELETE_CATEGORY: {
			return {
				...state,
				categories: state.categories.filter(item => item !== action.payload),
			}
		}
		case types.DELETE_LANGUAGE: {
			return {
				...state,
				languages: state.languages.filter(item => item !== action.payload),
			}
		}
		case types.DELETE_PEOPLE_WANTED: {
			return {
				...state,
				peopleWanted: state.peopleWanted.filter(item => item !== action.payload),
			}
		}
		default: {
			return state;
		}
	}
}