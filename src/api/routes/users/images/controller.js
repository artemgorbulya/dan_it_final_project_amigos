import ImageService from "../../../../services/ImageService";
import StatusService from "../../../../services/StatusService";

export const addNewUserImage = async (req, res) => {
	const updatedUser = await ImageService.addUserImage(req.body.photo, req.user.userID);
	StatusService.buildResponse(updatedUser, res);
}

export const deleteUserImage = async (req, res) => {
	const updatedUser = await ImageService.removeUserImage(req.body.photoID, Number(req.user.userID), Number(req.params.id));
	StatusService.buildResponse(updatedUser, res)
}

export const changeAvatar = async (req, res) => {
	const updatedUser = await ImageService.updateUserAvatar(req.body.photoID, Number(req.user.userID), Number(req.params.id));
	StatusService.buildResponse(updatedUser, res)
}