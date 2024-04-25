import dotenv from "dotenv";

const ENV = dotenv.config();

if (!ENV) {
	throw new Error("Config file wasn't found!");
}

export default {
	/**
	 * @desc Backend server port
	 */
	PORT: process.env.PORT || 3005,

	/**
	 * @desc Prefix for app api
	 */
	PREFIX: process.env.API_PREFIX || "/api",

	/**
	 * @desc MongoDB connection URI
	 */
	MONGODB_URI: process.env.MONGODB_URI || null,

	/**
	 * @desc JWT Secret string
	 */
	JWT_SECRET: process.env.JWT_SECRET || null,

	/**
	 * @desc Cloudinary connection
	 */
	CLOUDINARY_URL: process.env.CLOUDINARY_URL || null,
} 