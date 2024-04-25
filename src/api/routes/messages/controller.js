import MessageService from "../../../services/MessageService";
import StatusService from "../../../services/StatusService";

export const createChatRoom = async (req, res) => {
	const returnData = await MessageService.createChatRoom(Number(req.user.userID), req.body, req.query);
	StatusService.buildResponse(returnData, res);
}