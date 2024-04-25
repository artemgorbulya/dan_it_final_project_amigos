import {EventSchema, UserSchema} from "../db/models/index";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import CONFIG from "../config/index";
import EventService from "./EventService";
import cloudinary from "cloudinary";
import { defaultUserAvatar } from "../constants";
import RequestError from '../errors/RequestError';
import { getDayTimestamp } from "../utils/getDayTimestamp";

export default class UserService {
	/**
	 * @desc Get user by its _id value from mongodb
	 * 
	 * @param {Number} id
	 */
	static getUserById = async (id, reqID) => {
		try {
			const timestamp = getDayTimestamp();
			return await UserSchema
				.findById(id)
				.select(["-__v", '-password'])
				.populate({
					path: "events", 
					select: ['-__v'],
					match: {
						$and: [
							{
								$or: [
									{
										dateStart: null,
									},
									{
										dateStart: {
											$gte: timestamp
										}
									},
								]
							},
							{
								$or: [
									{
										dateEnd: null,
									},
									{
										dateEnd: {
											$gte: timestamp
										}
									},
								]
							}
						],
					}
				})
				.exec();
		} catch {
			return new RequestError("User not found", 404);
		}
	}

	/**
	 * @desc Get all data from DB by user email
	 * 
	 * @param {String} email
	 */
	static getUserDataByEmail = async (email) => {
		try {
			const timestamp = getDayTimestamp();
			const match = {
				$and: [
					{
						$or: [
							{
								dateStart: null,
							},
							{
								dateStart: {
									$gte: timestamp
								}
							},
						]
					},
					{
						$or: [
							{
								dateEnd: null,
							},
							{
								dateEnd: {
									$gte: timestamp
								}
							},
						]
					}
				],
			};

			return await UserSchema
				.findOne({email: email})
				.populate({
					path: "events",
					select: ["-__v"],
					match,
					populate: {
						path: "applicants",
						select: ["birthday", "firstName", "_id", "photos"],
					}
				})
				.populate({
					path: "events",
					select: ["-__v"],
					match,
					populate: {
						path: "membersAllowed",
						select: ["birthday", "firstName", "_id", "photos"],
					}
				})
				.populate({
					path: "sentEvents",
					select: ["-__v"],
					match,
					populate: {
						path: "author",
						select: ["birthday", "firstName", "_id", "photos"],
					}
				})
				.populate({
					path: "appliedEvents",
					select: ["-__v"],
					match,
					populate: {
						path: "author",
						select: ["birthday", "firstName", "_id", "photos"],
					}
				})
				.select(["-__v"])
				.exec();
		} 
		catch (error) {
			return new RequestError("Data is incorrect!", 403)
		}
	}

	/**
	 * 
	 * @param {Number} id
	 * @param {Object} data
	 */
	static changeUserDataByID = async (id, data) => {
		try {
			const timestamp = getDayTimestamp();
			const match = {
				$and: [
					{
						$or: [
							{
								dateStart: null,
							},
							{
								dateStart: {
									$gte: timestamp
								}
							},
						]
					},
					{
						$or: [
							{
								dateEnd: null,
							},
							{
								dateEnd: {
									$gte: timestamp
								}
							},
						]
					}
				],
			};

			return await UserSchema
				.findByIdAndUpdate(id, data, {new: true})
				.populate({
					path: "events",
					select: ["-__v"],
					match,
					populate: {
						path: "applicants",
						select: ["birthday", "firstName", "_id", "photos"],
					}
				})
				.populate({
					path: "events",
					select: ["-__v"],
					match,
					populate: {
						path: "membersAllowed",
						select: ["birthday", "firstName", "_id", "photos"],
					}
				})
				.populate({
					path: "sentEvents",
					select: ["-__v"],
					match,
					populate: {
						path: "author",
						select: ["birthday", "firstName", "_id", "photos"],
					}
				})
				.populate({
					path: "appliedEvents",
					select: ["-__v"],
					match,
					populate: {
						path: "author",
						select: ["birthday", "firstName", "_id", "photos"],
					}
				})
				.select(["-__v"])
				.exec();
		} 
		catch (error) {
			return new RequestError("Data is incorrect!", 403)
		}
	}


	/**
	 * @desc Create user on registration and save it to mongodb
	 * 
	 * @param {Object} userData
	 */
	static createUser = async (userData) => {		
		const { password, email } = userData;
		if (await UserSchema.findOne({email}).exec()) {
			return new RequestError("User already exists!", 403);
		}
		const hashedPassword = await argon2.hash(password);

		const user = await UserSchema.create({
			...userData,
			password: hashedPassword,
			photos: [defaultUserAvatar]
		});

		const token = jwt.sign({
			email: user.email,
			userID: user._id,
		}, CONFIG.JWT_SECRET)
		
		return {
			user: {
				...user.toObject(),
				__v: undefined,
				password: undefined,
			},
			token: `Bearer ${token}`,
		};	
	}

	/**
	 * @desc Login user. Creating token
	 * 
	 * @param {String} email
	 * @param {String} password
	 */
	static loginUser = async ({email, password}) => {
		const user = await UserService.getUserDataByEmail(email);
		if (!user) return new RequestError("User is not found!", 404);

		if (await argon2.verify(user.password, password)) {
			const token = jwt.sign({
				email: email,
				userID: user._id,
			}, CONFIG.JWT_SECRET);

			const res = user.toObject();
			delete res.password;

			return {
				token: `Bearer ${token}`, 
				user: res,
			}
		}
		return new RequestError("Password is incorrect!", 401)
	}

	/**
	 * @desc Delete user from mongodb by its token
	 * 
	 * @param {Number} id
	 * @param {Object} reqUser
	 */
	static deleteUser = async (id, reqUser, password) => {
		if (id !== reqUser.userID) return new RequestError("Oops, something went wrong! Make sure you have correct token!", 403);
		const user = await UserSchema.findById(id).exec();

		if (!(await argon2.verify(user.password, password))) return new RequestError("Password is incorrect!", 403);

		user.events.forEach(async eventID => await EventService.deleteEvent(id, eventID));

		user.sentEvents.forEach(async (sentEventID) => {
			const sentEvent = await EventSchema.findById(sentEventID);
			sentEvent.applicants.splice(sentEvent.applicants.indexOf(id), 1);
			await EventSchema.findByIdAndUpdate(sentEventID, sentEvent);
		})
		user.appliedEvents.forEach(async (appliedEventID) => {
			const appliedEvent = await EventSchema.findById(appliedEventID);
			appliedEvent.membersAllowed.splice(appliedEvent.membersAllowed.indexOf(id), 1);
			await EventSchema.findByIdAndUpdate(appliedEventID, appliedEvent);
		})
		user.deniedEvents.forEach(async (deniedEventID) => {
			const deniedEvent = await EventSchema.findById(deniedEventID);
			deniedEvent.membersDenied.splice(deniedEvent.membersDenied.indexOf(id), 1);
			await EventSchema.findByIdAndUpdate(deniedEventID, deniedEvent);
		})

		await cloudinary.v2.api.delete_resources_by_prefix(`/users/${id}`);
		await cloudinary.v2.api.delete_resources_by_prefix(`/events/${id}`);

		return await UserSchema.findByIdAndDelete(id).exec();
	}

	/**
	 * @desc Change user data in mongodb by its token
	 * @param {Number} id
	 * @param {Object} reqUser
	 * @param {Object} reqBody
	 */
	static changeUserData = async (id, reqUser, reqBody) => {
		if (id !== reqUser.userID) { 
			return new RequestError("Oops, something went wrong! Make sure you have correct token!", 403);
		}

		return await UserService.changeUserDataByID(id, reqBody);
	}

	/**
	 * @desc Change user password
	 * @param {Number} id
	 * @param {Object} reqUser
	 * @param {Object} reqBody
	 */
	static changeUserPassword = async (id, reqUser, reqBody) => {
		if (id !== reqUser.userID) { 
			return new RequestError("Oops, something went wrong! Make sure you have correct token!", 403);
		}

		const user = await UserSchema.findById(id).exec();
		if (await argon2.verify(user.password, reqBody.oldPassword)) {
			const newPassword = await argon2.hash(reqBody.newPassword);
			return await UserService.changeUserDataByID(id, {password: newPassword});
		}
		
		return new RequestError("Password is incorrect!", 403);
	}

	/**
	 * @desc Token verification
	 * @param {String} token 
	 */
	static verifyUser = async (token) => {
		try {
			const decoded = jwt.verify(token, CONFIG.JWT_SECRET);

			const newToken = jwt.sign({
				email: decoded.email,
				userID: decoded.userID,
			}, CONFIG.JWT_SECRET);

			return {
				token: `Bearer ${newToken}`,
				user: await UserService.getUserDataByEmail(decoded.email),
			};
		} catch {
			return new RequestError("Token is incorrect!", 403);
		};
	}

	/**
	 * @desc Set timestamp of user's last leave
	 * 
	 * @param {Number} userID 
	 */
	static setLastSeen = async (userID) => {
		await UserSchema.findByIdAndUpdate(userID, {lastSeen: new Date().getTime()})
	}
}