import actions from "./actions";

const setPeopleWanted = (peopleWanted) => dispatch => {
	dispatch(actions.peopleWantedAction(peopleWanted));
}
const setMinAge = (minAge) => dispatch => {
	dispatch(actions.minAgeAction(minAge));
}
const setMaxAge = (maxAge) => dispatch => {
	dispatch(actions.maxAgeAction(maxAge));
}
const setCity = (city) => dispatch => {
	dispatch(actions.cityAction(city));
}
const setLanguages = (languages) => dispatch => {
	dispatch(actions.languagesAction(languages));
}
const setCategories = (categories) => dispatch => {
	dispatch(actions.categoriesAction(categories));
}
const setAll = (all) => dispatch => {
	dispatch(actions.allAction(all));
}
const resetAll = () => dispatch => {
	dispatch(actions.resetAllAction());
}

const deleteMinAge = () => dispatch => {
	dispatch(actions.deleteMinAge());
}
const deleteMaxAge = () => dispatch => {
	dispatch(actions.deleteMaxAge());
}
const deleteLanguage = (language) => dispatch => {
	dispatch(actions.deleteLanguage(language));
}
const deleteCategory = (category) => dispatch => {
	dispatch(actions.deleteCategory(category));
}
const deletePeopleWanted = (type) => dispatch => {
	dispatch(actions.deletePeopleWanted(type));
}

export default {
	setPeopleWanted,
	setMinAge,
	setMaxAge,
	setCity,
	setLanguages,
	setCategories,
	setAll,
	resetAll,
	deleteMinAge,
	deleteMaxAge,
	deleteLanguage,
	deleteCategory,
	deletePeopleWanted,
}