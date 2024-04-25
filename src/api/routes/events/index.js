import {Router} from "express";
import { getEventById, changeEvent, deleteEvent, createEvent } from "./controller";
import errorHandler from "../../../errors/routeErrorController";
import subscribtionController from "./subscribtion/index";

const route = Router();

export default (baseRouter) => {
	baseRouter.use("/events", route);

	subscribtionController(route);
	route.get("/:id", errorHandler(getEventById));
	route.post("/", errorHandler(createEvent));
	route.put("/:id", errorHandler(changeEvent));
	route.delete("/:id", errorHandler(deleteEvent));
}