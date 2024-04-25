import cors from "cors";
import CONFIG from "../../config/index";

const allowedOrigins = [
	`http://localhost:${CONFIG.PORT}/`,
	`http://localhost:${CONFIG.PORT}`,
	`http://localhost:3000/`,
	`http://localhost:8000/`,
	`https://fe16-final.herokuapp.com`
]

export default cors({
	origin: (origin, callback) => {
		// allow requests with no origin
		// (like mobile apps or curl requests)
		if (!origin) {
			return callback(null, true);
		}
		if (allowedOrigins.indexOf(origin) === -1) {
			const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
			return callback(new Error(msg), false);
		}
		return callback(null, true);
	},
	credentials: true
})