import {Router} from "express";
import { createCategory, changeCategory, deleteCategory, getAllCategories, getCategory } from "./controller";
import errorHandler from "../../../errors/routeErrorController";

const route = Router();

export default baseRouter => {
    baseRouter.use("/categories", route);

    route.get("/", errorHandler(getAllCategories));
    route.post("/", errorHandler(createCategory));
    route.get("/:id", errorHandler(getCategory));
    route.put("/:id", errorHandler(changeCategory));
    route.delete("/:id", errorHandler(deleteCategory));
}