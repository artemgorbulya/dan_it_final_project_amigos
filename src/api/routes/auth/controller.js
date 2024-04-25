import jwt from 'jsonwebtoken';
import CONFIG from '../../../config/index';
import StatusService from '../../../services/StatusService';
import UserService from "../../../services/UserService";

const _generateToken = (email, id) => {
	const tokenNew = jwt.sign({
		email,
		userID: id,
	}, CONFIG.JWT_SECRET);

	return `Bearer ${tokenNew}`;
}

export const registerUser = async (req, res) => {
	const data = await UserService.createUser(req.body);
	StatusService.buildResponse(data, res);
}

export const loginUser = async (req, res) => {
	const user = await UserService.loginUser(req.body);
	StatusService.buildResponse(user, res);
}

export const verifyUser = async (req, res) => {
	const token = req.body.token.split(" ")[1];
	const data = await UserService.verifyUser(token, res);
	StatusService.buildResponse(data, res);
}

export const refreshToken = (req, res) => {
	const token = req.body.token.split(" ")[1];

	const decoded = jwt.decode(token);

	StatusService.buildResponse(_generateToken(decoded.email, decoded.userID), res);
	// res.json(_generateToken(decoded.email, decoded.userID));
}