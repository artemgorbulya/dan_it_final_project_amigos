import axios from "axios";
import actions from "./actions";

const getCategories = () => dispatch => {
    dispatch(actions.categoriesLoading(true));

    axios.get(`/api/categories`).then(res => {
        dispatch(actions.categoriesSaving(res.data.data));
        dispatch(actions.categoriesLoading(false));
    }).catch(err => {
        console.log(err);
        dispatch(actions.categoriesLoading(false));
    });
};

export default {
    getCategories
};
