import { UserSchema, EventSchema } from "../db/models";
import UserService from "./UserService";
import cloudinary from "cloudinary";
import RequestError from "../errors/RequestError";

export default class EventService {
	/**
	 * 
	 * @param {Object} data
	 * @param {Number} userID 
	 */
	static createEvent = async (data, userID) => {
		const imageRes = await cloudinary.v2.uploader.upload(data.photo, {
			folder: `events/${userID}`,
		});

		const newEvent = await EventSchema.create({
			author: userID,
			...data,
			photo: imageRes.url,
			photoPublicID: imageRes.public_id,
		});

		const eventCreator = await UserSchema.findById(userID).exec();
		eventCreator.events.push(newEvent._id);
		return await UserService.changeUserDataByID(userID, eventCreator);
	}

	/**
	 * 
	 * @param {Number} eventId 
	 */
	static getEventById = async (eventId) => {
		const event = await EventSchema.findById(eventId).select(["-__v"]).exec();
		if (!event) return new RequestError("Data not found!", 404);
	
		return await event.execPopulate("author", ["-__v", "-password"]);
	}

	/**
	 * 
	 * @param {Number} userID 
	 * @param {Number} eventID 
	 */
	static deleteEvent = async (userID, eventID) => {
		const user = await UserSchema.findById(userID).exec();
		const targetEvent = await EventSchema.findById(eventID).exec();
		if (targetEvent.author !== userID) return new RequestError("User data is incorrect!", 403);
		
		const targetEventIndex = user.events.findIndex(item => item === eventID);
		user.events.splice(targetEventIndex, 1);
		await UserSchema.findByIdAndUpdate(userID, user);
		
		await cloudinary.v2.uploader.destroy(targetEvent.photoPublicID);
		
		// Clear all subscritions from event
		targetEvent.applicants.forEach(async (applicantID) => {
			const applicant = await UserSchema.findById(applicantID).exec();
			applicant.sentEvents.splice(applicant.sentEvents.indexOf(eventID), 1);
			await UserSchema.findByIdAndUpdate(applicantID, applicant);
		})
		targetEvent.membersAllowed.forEach(async (allowedID) => {
			const allowed = await UserSchema.findById(allowedID).exec();
			allowed.sentEvents.splice(allowed.sentEvents.indexOf(eventID), 1);
			await UserSchema.findByIdAndUpdate(allowedID, allowed);
		})
		targetEvent.membersDenied.forEach(async (deniedID) => {
			const denied = await UserSchema.findById(deniedID).exec();
			denied.sentEvents.splice(denied.sentEvents.indexOf(eventID), 1);
			await UserSchema.findByIdAndUpdate(deniedID, denied);
		})

		return await EventSchema
			.findByIdAndDelete(eventID)
			.select(["-__v"])
			.populate("applicants", ["-password", "-__v"])
			.populate("membersAllowed", ["-password", "-__v"])
			.exec();
	}

	/**
	 * 
	 * @param {Number} userID 
	 * @param {Number} eventID 
	 * @param {Object} eventData 
	 */
	static changeEventData = async (userID, eventID, eventData) => {
		const targetEvent = await EventSchema.findById(eventID).exec();
		if (targetEvent.author !== userID) return new RequestError("User data is incorrect!", 403);
		
		const updatedEvent = {
			...targetEvent,
			...eventData,
			photo: targetEvent.photo,
			photoPublicID: targetEvent.photoPublicID,
		}

		if (eventData.photo) {
			await cloudinary.v2.uploader.destroy(targetEvent.photoPublicID);
			const newPhoto = await cloudinary.v2.uploader.upload(eventData.photo, {
				folder: `events/${userID}`,
			});
			updatedEvent.photo = newPhoto.url;
			updatedEvent.photoPublicID = newPhoto.public_id;
		}
		
		return await EventSchema.findByIdAndUpdate(eventID, updatedEvent, {new: true}).select(["-__v"]).exec();
	}
}