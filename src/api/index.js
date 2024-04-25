import Router from "express";
import authController from "./routes/auth/index";
import usersController from "./routes/users/index";
import eventsController from "./routes/events/index";
import categoriesController from "./routes/categories";
import feedController from "./routes/feed";

export default () => {
	const router = Router();

	authController(router);
	usersController(router);
	eventsController(router);
	categoriesController(router);
	feedController(router);
	
	return router;
}