import logger from "../../errors/mongoDBLogger";

const errorHandler = (error, req, res, next) => {
	logger.error(error.message);
	console.error(error);
	return res.status(error.status || 500).send({
		error: {
			status: error.status || 500,
			message: error.message || "Oops, something went wrong :(",
		},	
	});	
}

export default errorHandler;