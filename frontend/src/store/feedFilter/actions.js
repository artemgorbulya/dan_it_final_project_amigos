import types from "./types";

const peopleWantedAction = (peopleWanted) => ({
	type: types.SET_PEOPLE_WANTED,
	payload: peopleWanted,
});

const minAgeAction = (minAge) => ({
	type: types.SET_MIN_AGE,
	payload: minAge,
});

const maxAgeAction = (maxAge) => ({
	type: types.SET_MAX_AGE,
	payload: maxAge,
});

const cityAction = (city) => ({
	type: types.SET_CITY,
	payload: city,
});

const dateStartAction = (dateStart) => ({
	type: types.SET_DATE_START,
	payload: dateStart,
});

const languagesAction = (languages) => ({
	type: types.SET_LANGUAGES,
	payload: languages,
});

const categoriesAction = (categories) => ({
	type: types.SET_CATEGORIES,
	payload: categories,
})

const allAction = (all) => ({
	type: types.SET_ALL,
	payload: all,
})

const resetAllAction = () => ({
	type: types.RESET_ALL,
})

const deleteMinAge = () => ({
	type: types.DELETE_MIN_AGE
})
const deleteMaxAge = () => ({
	type: types.DELETE_MAX_AGE
})
const deleteLanguage = (language) => ({
	type: types.DELETE_LANGUAGE,
	payload: language
})
const deleteCategory = (category) => ({
	type: types.DELETE_CATEGORY,
	payload: category
})
const deletePeopleWanted = (type) => ({
	type: types.DELETE_PEOPLE_WANTED,
	payload: type
})

export default {
	peopleWantedAction,
	minAgeAction,
	maxAgeAction,
	cityAction,
	dateStartAction,
	languagesAction,
	categoriesAction,
	allAction,
	resetAllAction,
	deleteMinAge,
	deleteMaxAge,
	deleteLanguage,
	deleteCategory,
	deletePeopleWanted,
}