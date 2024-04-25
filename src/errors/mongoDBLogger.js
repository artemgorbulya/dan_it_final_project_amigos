import {transports, format, createLogger} from "winston";
import CONFIG from "../config/index";
import 'winston-mongodb';

const logger = createLogger({
	transports: [
		new transports.MongoDB({
			level: "error",
			db: CONFIG.MONGODB_URI,
			collection: "serverErrors",
			options: { 
				useUnifiedTopology: true 
			},
			format: format.combine(format.timestamp(), format.json()),
		})
	]
});

export default logger;