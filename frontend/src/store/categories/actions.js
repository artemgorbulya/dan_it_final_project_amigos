import types from "./types";

const categoriesLoading = (isLoading) => ({
    type: types.CATEGORIES_LOADING,
    payload: isLoading
});

export const categoriesSaving = (data) => ({
    type: types.CATEGORIES_SAVE,
    payload: data
});

export default {
    categoriesLoading,
    categoriesSaving
}
