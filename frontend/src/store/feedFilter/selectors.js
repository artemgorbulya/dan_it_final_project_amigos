const getPeopleWanted = state => state.feedFilter.peopleWanted;
const getMinAge = state => state.feedFilter.minAge;
const getMaxAge = state => state.feedFilter.maxAge;
const getDateStart = state => state.feedFilter.dateStart;
const getLanguages = state => state.feedFilter.languages;
const getCategories = state => state.feedFilter.categories;
const getAll = state => state.feedFilter;

export default {
	getPeopleWanted,
	getMinAge,
	getMaxAge,
	getDateStart,
	getLanguages,
	getCategories,
	getAll,
}