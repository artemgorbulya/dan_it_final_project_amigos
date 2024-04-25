import StatusService from "../../../../services/StatusService";
import SubscribtionService from "../../../../services/SubscribtionService"

export const subscribeToEvent = async (req, res) => {
	const updatedEvent = await SubscribtionService.subscribeToEvent(Number(req.user.userID), Number(req.params.id));
	StatusService.buildResponse(updatedEvent, res);
}

export const unsubscribeFromEvent = async (req, res) => {
	const updatedEvent = await SubscribtionService.unsubscribeFromEvent(Number(req.user.userID), Number(req.params.id));
	StatusService.buildResponse(updatedEvent, res);
}

export const allowUser = async (req, res) => {
	const updatedEvent = await SubscribtionService.allowUser(Number(req.body.userID), Number(req.params.id));
	StatusService.buildResponse(updatedEvent, res);
}

export const denyUser = async (req, res) => {
	const updatedEvent = await SubscribtionService.denyUser(Number(req.body.userID), Number(req.params.id));
	StatusService.buildResponse(updatedEvent, res);
}