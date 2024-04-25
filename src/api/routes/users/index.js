import {Router} from "express";
import { getUserData, getUserById, changeUserData, deleteUser, changeUserPassword } from "./controller";
import errorHandler from "../../../errors/routeErrorController";
import imageController from "./images/index";

const route = Router();

export default baseRouter => {
	baseRouter.use("/users", route);

	imageController(route);
	route.get("/", errorHandler(getUserData));
	route.post("/:id", errorHandler(getUserById));
	route.put("/:id", errorHandler(changeUserData));
	route.put("/:id/password", errorHandler(changeUserPassword));
	route.delete("/:id", errorHandler(deleteUser));
}