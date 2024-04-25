import jwt from 'jsonwebtoken';
import RequestError from '../../../errors/RequestError';
import StatusService from "../../../services/StatusService";
import UserService from "../../../services/UserService";

export const getUserData = async (req, res) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];

	if (!token)
		StatusService.buildResponse(new RequestError("Token is undentified!", 401), res);

	const { email } = jwt.decode(token);
	const userData = await UserService.getUserDataByEmail(email);

	StatusService.buildResponse(userData, res);
}

export const getUserById = async (req, res) => {
	const user = await UserService.getUserById(Number(req.params.id), Number(req.user.userID));
	StatusService.buildResponse(user, res);
}

export const changeUserData = async (req, res) => {
	const user = await UserService.changeUserData(Number(req.params.id), req.user, req.body);
	StatusService.buildResponse(user, res);
}

export const changeUserPassword = async (req, res) => {
	const user = await UserService.changeUserPassword(Number(req.params.id), req.user, req.body);
	StatusService.buildResponse(user, res);
}

export const deleteUser = async (req, res) => {
	const result = await UserService.deleteUser(Number(req.params.id), req.user, req.body.password);
	StatusService.buildResponse(result, res);
}