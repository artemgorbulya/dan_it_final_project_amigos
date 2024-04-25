import EventService from "../../../services/EventService";
import StatusService from "../../../services/StatusService";

export const getEventById = async (req, res) => {
	const eventData = await EventService.getEventById(Number(req.params.id));
	StatusService.buildResponse(eventData, res);
}

export const createEvent = async (req, res) => {
	const eventData = await EventService.createEvent(req.body, Number(req.user.userID));
	StatusService.buildResponse(eventData, res);
}

export const changeEvent = async (req, res) => {
	const eventData = await EventService.changeEventData(Number(req.user.userID), Number(req.params.id), req.body);
	StatusService.buildResponse(eventData, res);
}

export const deleteEvent = async (req, res) => {
	const eventData = await EventService.deleteEvent(Number(req.user.userID), Number(req.params.id));
	StatusService.buildResponse(eventData, res);
}