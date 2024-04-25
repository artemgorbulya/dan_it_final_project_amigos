import {EventSchema, UserSchema} from "../db/models/index";
import RequestError from "../errors/RequestError";

export default class SubscribtionService {
	/**
	 * 
	 * @param {Number} userID 
	 * @param {Number} eventID 
	 */
	static subscribeToEvent = async (userID, eventID) => {
		const targetEvent = await EventSchema.findById(eventID).exec();
		if (!targetEvent || targetEvent.applicants.indexOf(userID) !== -1) {
			return new RequestError("You have already subscribed to this event", 403);
		}

		targetEvent.applicants.push(userID);

		const targetUser =  await UserSchema.findById(userID).exec();
		targetUser.sentEvents.push(eventID);
		await UserSchema.findByIdAndUpdate(userID, targetUser);

		return await EventSchema
			.findByIdAndUpdate(eventID, targetEvent, {new: true})
			.select(["-__v"])
			.populate("applicants", ["-__v", "-password"])
			.populate("author", ["-__v", "-password"])
			.exec()
	}

	/**
	 * 
	 * @param {Number} userID 
	 * @param {Number} eventID 
	 */
	static unsubscribeFromEvent = async (userID, eventID) => {
		const targetEvent = await EventSchema.findById(eventID).exec();
		const targetUser = await UserSchema.findById(userID).exec();

		const applicantsIndex = targetEvent.applicants.indexOf(userID);
		const membersAllowedIndex = targetEvent.membersAllowed.indexOf(userID);

		if (applicantsIndex !== -1) {
			targetEvent.applicants.splice(targetEvent.applicants.indexOf(userID), 1);
			targetUser.sentEvents.splice(targetUser.sentEvents.indexOf(eventID), 1);
		}
		if (membersAllowedIndex !== -1) {
			targetEvent.membersAllowed.splice(targetEvent.membersAllowed.indexOf(userID), 1);
			targetUser.appliedEvents.splice(targetUser.appliedEvents.indexOf(eventID), 1);
		}

		await UserSchema.findByIdAndUpdate(userID, targetUser);

		return await EventSchema
			.findByIdAndUpdate(eventID, targetEvent, {new: true})
			.select(["-__v"])
			.populate("applicants", ["-__v", "-password"])
			.populate("author", ["-__v", "-password"])
			.exec()
	}

	/**
	 * 
	 * @param {Number} userID 
	 * @param {Number} eventID 
	 */
	static allowUser = async (userID, eventID) => {
		const targetEvent = await EventSchema.findById(eventID).exec();
		targetEvent.membersAllowed.push(targetEvent.applicants.splice(targetEvent.applicants.indexOf(userID), 1)[0]);

		const targetUser = await UserSchema.findById(userID).exec();
		targetUser.sentEvents.splice(targetUser.sentEvents.indexOf(eventID), 1);
		targetUser.appliedEvents.push(eventID);
		await UserSchema.findByIdAndUpdate(userID, targetUser);

		return await EventSchema
			.findByIdAndUpdate(eventID, targetEvent, {new: true})
			.select(["-__v"])
			.populate("applicants", ["-__v", "-password"])
			.populate("membersAllowed", ["-__v", "-password"])
			.exec()
	}

	/**
	 * 
	 * @param {Number} userID 
	 * @param {Number} eventID 
	 */
	static denyUser = async (userID, eventID) => {
		const targetEvent = await EventSchema.findById(eventID).exec();
		const targetUser = await UserSchema.findById(userID).exec();

		const applicantsIndex = targetEvent.applicants.indexOf(userID);
		const membersAllowedIndex = targetEvent.membersAllowed.indexOf(userID);

		if (applicantsIndex !== -1) {
			targetEvent.membersDenied.push(targetEvent.applicants.splice(applicantsIndex, 1)[0]);
			targetUser.sentEvents.splice(targetUser.sentEvents.indexOf(eventID), 1);
		}
		if (membersAllowedIndex !== -1) {
			targetEvent.membersDenied.push(targetEvent.membersAllowed.splice(membersAllowedIndex, 1)[0]);
			targetUser.appliedEvents.splice(targetUser.appliedEvents.indexOf(eventID), 1);
		}

		targetUser.deniedEvents.push(eventID);
		await UserSchema.findByIdAndUpdate(userID, targetUser);

		return await EventSchema
			.findByIdAndUpdate(eventID, targetEvent, {new: true})
			.select(["-__v"])
			.populate("applicants", ["-__v", "-password"])
			.populate("membersAllowed", ["-__v", "-password"])
			.exec()
	}
}