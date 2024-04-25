import {Router} from "express";
import errorHandler from "../../../errors/routeErrorController";
import { createChatRoom } from "./controller";

const route = Router();

export default baseRouter => {
	baseRouter.use("/messages", route);

	route.post("/createChatRoom", errorHandler(createChatRoom));
}