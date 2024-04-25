import CategoryService from "../../../services/CategoryService";
import StatusService from "../../../services/StatusService";

export const createCategory = async (req, res) => {
    const categoryData = await CategoryService.createCategory(req.body);
    StatusService.buildResponse(categoryData, res);
}

export const changeCategory = async (req, res) => {
    const categoryData = await CategoryService.updateCategory(Number(req.params.id), req.body);
    StatusService.buildResponse(categoryData, res);
}

export const deleteCategory = async (req, res) => {
    const categoryData = await CategoryService.deleteCategory(Number(req.params.id));
    StatusService.buildResponse(categoryData, res);
}

export const getAllCategories = async (req, res) => {
    const categoryData = await CategoryService.getAllCategories();
    StatusService.buildResponse(categoryData, res);
}

export const getCategory = async (req, res) => {
    const categoryData = await CategoryService.getCategoryById(Number(req.params.id));
    StatusService.buildResponse(categoryData, res);
}