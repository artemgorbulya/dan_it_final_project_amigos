import mongoose from "mongoose";
import CONFIG from "../config/index";

export default async () => {
	await mongoose.connect(
		CONFIG.MONGODB_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true
		}
	)

	return mongoose.connection.db;
}