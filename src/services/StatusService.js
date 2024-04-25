import RequestError from "../errors/RequestError"

export default class StatusService {
	static buildResponse = (data, res) => {
		if (data instanceof RequestError) {
			res.status(data.code).json({
				message: data.message,
			})
		} else {
			res.json({
				data,
				success: true,
			})
		}
	}

	static buildSocketCallback = (data) => {
		if (data instanceof RequestError) {
			return {
				message: data.message,
				status: data.code,
			}
		}
		return {
			data, 
			success: true
		}
	}
}