export default class RequestError extends Error {
	constructor(message, code) {
		super(message);

		this.code = code;
	}
}