import bodyParser from "body-parser";
import CONFIG from "../config/index";
import routes from "../api/index";
import authToken from "../api/middleware/authToken";
import errorHandler from "../api/middleware/errorHandler";
import cors from "../api/middleware/cors";

export default async (app) => {
	/**
	 * @desc CORS middleware
	 */
	app.use(cors);

	/**
	 * @desc JSON Body parser middleware
	 */
	app.use(bodyParser.json({limit: "50mb"}));

	/**
	 * @desc authToken reads Authorization header on all routes, exept /api/auth/login and /api/auth/register
	 */
	app.use(authToken);

	/**
	 * @desc API Routes middleware, wrapped into async HOF, that is used for catching any type of errors
	 */
	app.use(CONFIG.PREFIX, routes());

	/**
	 * @desc Error handler for any type of errors (simple errors or unhandled promise rejections)
	 */
	app.use(errorHandler);
}