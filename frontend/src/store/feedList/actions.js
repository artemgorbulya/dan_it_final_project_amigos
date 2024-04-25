import types from "./types";

const addNewEvents = (newEvents) => ({
	type: types.ADD_TO_FEED,
	payload: newEvents,
});

const setPage = (pageNum) => ({
	type: types.SET_PAGE,
	payload: pageNum,
});

const setNextPage = (nextPage) => ({
	type: types.SET_NEXT_PAGE,
	payload: nextPage,
})

const setIsLoading = (isLoading) => ({
	type: types.SET_IS_LOADING,
	payload: isLoading,
})

const setIsFiltered = (isFiltered) => ({
	type: types.SET_IS_FILTERED,
	payload: isFiltered
})

const setNewEvents = (events) => ({
	type: types.SET_NEW_EVENTS,
	payload: events,
})

const resetData = () => ({
	type: types.RESET_DATA,
})

const saveMapList = (events) => ({
	type: types.SAVE_MAP_FEED,
	payload: events,
})

const saveMapCenter = (center) => ({
	type: types.SAVE_MAP_CENTER,
	payload: center,
})

export default {
	addNewEvents,
	setPage,
	setNextPage,
	setIsLoading,
	setIsFiltered,
	setNewEvents,
	resetData,
	saveMapList,
	saveMapCenter
}