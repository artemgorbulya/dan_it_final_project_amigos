import types from "./types"

const inititalState = {
	connected: false,
}

export const reducer = (state = inititalState, action) => {
	switch (action.type) {
		case types.CONNECTION_STATUS: {
			return {...state, connected: action.payload};
		}
		default: {
			return state;
		}
	}
}