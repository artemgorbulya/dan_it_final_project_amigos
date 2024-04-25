import types from "./types"

const setConnectionStatus = (status) => dispatch => {
	dispatch({
		type: types.CONNECTION_STATUS,
		payload: status,
	})
}

export default {
	setConnectionStatus
}