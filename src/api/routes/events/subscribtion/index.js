import {Router} from "express";
import errorHandler from "../../../../errors/routeErrorController";
import {subscribeToEvent, unsubscribeFromEvent, allowUser, denyUser} from "./controller";

const route = Router();

export default (eventsRouter) => {
	eventsRouter.use("/", route);

	route.put("/:id/subscribe", errorHandler(subscribeToEvent));
	route.put("/:id/unsubscribe", errorHandler(unsubscribeFromEvent));
	route.put("/:id/allow", errorHandler(allowUser))
	route.put("/:id/deny", errorHandler(denyUser))
}