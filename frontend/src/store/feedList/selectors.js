const getFeedList = state => state.feedList.list;
const getCurrentPage = state => state.feedList.currentPage;
const getNextPage = state => state.feedList.nextPage;
const getIsLoading = state => state.feedList.isLoading;
const getMapList = state => state.feedList.mapList;
const getMapCenter = state => state.feedList.mapCenter;

export default {
	getFeedList,
	getCurrentPage,
	getNextPage,
	getIsLoading,
	getMapList,
	getMapCenter,
}