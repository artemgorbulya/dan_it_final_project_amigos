import {Router} from "express";
import errorHandler from "../../../../errors/routeErrorController";
import { addNewUserImage, deleteUserImage, changeAvatar } from "./controller";

const route = Router();

export default (usersRoute) => {
	usersRoute.use("/", route);

	route.post("/:id/images", errorHandler(addNewUserImage));
	route.delete("/:id/images", errorHandler(deleteUserImage));
	route.put("/:id/images", errorHandler(changeAvatar))
}