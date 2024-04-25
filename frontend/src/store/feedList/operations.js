import {modalOperations} from "../modal/index";
import actions from "./actions";
import axios from "axios";

const getFeed = (filter) => (dispatch, getState) => {
	const state = getState();
	dispatch(actions.setIsLoading(true));

	axios.post(`/api/feed/list?page=${filter ? 1 : state.feedList.nextPage}&limit=10`, state.feedFilter)
		.then(res => {
			if (filter) {
				dispatch(actions.setNewEvents(res.data.data.docs))
			} else {
				dispatch(actions.addNewEvents(res.data.data.docs));
			}
			dispatch(actions.setNextPage(res.data.data.nextPage));
			dispatch(actions.setPage(res.data.data.page));
			dispatch(actions.setIsLoading(false));
			dispatch(modalOperations.toggleModalOperation(false));
		}).catch(console.log);
};

const subscribeEventMap = (eventId, userId) => (dispatch, getState) => {
	const { feedList } = getState();
	const { mapList } = feedList;

	const index = mapList.findIndex(elem => elem._id === eventId);

	mapList[index].applicants = [...mapList[index].applicants, userId];
	dispatch(actions.saveMapList(mapList));
};

export default {
	getFeed,
	subscribeEventMap
}