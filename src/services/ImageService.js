import UserSchema from "../db/models/user";
import cloudinary from "cloudinary";
import { defaultUserAvatar } from "../constants";
import RequestError from "../errors/RequestError";
import UserService from "./UserService";

export default class ImageService {
	/**
	 * 
	 * @param {[String]} photos 
	 * @param {Number} id 
	 */
	static addUserImage = async (photo, id) => {
		const user = await UserSchema.findById(id).exec();
		if (user.photos[0].photoURL === defaultUserAvatar.photoURL) {
			user.photos.shift();
		}
		
		const {url, public_id} = await cloudinary.v2.uploader.upload(photo, {
			folder: `users/${id}`,
		});
		const newPhotoData = {
			photoURL: url, 
			photoID: public_id,
		}

		user.photos = [...user.photos, newPhotoData];

		return await UserService.changeUserDataByID(id, user);
	}
	
	/**
	 * 
	 * @param {String} photoID 
	 * @param {Number} userID 
	 * @param {Number} requestID 
	 */
	static removeUserImage = async (photoID, userID, requestID) => {
		if (userID !== requestID) return new RequestError("Oops, something went wrong! Make sure you have correct token!", 403);

		const user = await UserSchema.findById(userID).exec();
		if (user.photos.length === 1) {
			user.photos.push(defaultUserAvatar);
		}
		const targetPhotoIndex = user.photos.findIndex(item => item.photoID === photoID);
		user.photos.splice(targetPhotoIndex, 1);

		await cloudinary.v2.uploader.destroy(photoID);

		return await UserService.changeUserDataByID(userID, user);
	}

	/**
	 * 
	 * @param {String} photoID 
	 * @param {Number} userID 
	 * @param {Number} requestID 
	 */
	static updateUserAvatar = async (photoID, userID, requestID) => {
		if (userID !== requestID) return new RequestError("Oops, something went wrong! Make sure you have correct token!", 403);

		const user = await UserSchema.findById(userID).exec();
		const targetImageIndex = user.photos.findIndex(item => item.photoID === photoID);
		user.photos.unshift(user.photos.splice(targetImageIndex, 1)[0]);

		return await UserService.changeUserDataByID(userID, user);
	}

	/**
	 * 
	 * @param {String} filename 
	 * @param {Number} userID 
	 * @param {Number} postID 
	 * !!!! DEPRECATED !!!!
	 */
	// static deleteEventImage = async (filename, userID, eventID) => {
	// 	const user = await UserSchema.findById(userID);
	// 	if (!user.events.find(item => item === eventID)) return null;

	// 	const targetEvent = await EventSchema.findById(eventID);
	// 	const targetImageIndex = targetEvent.photos.findIndex(item => {
	// 		const parsedPath = item.split("\\");
	// 		return parsedPath[parsedPath.length - 1] === filename;
	// 	})
	// 	targetEvent.photos.splice(targetImageIndex, 1);
	// 	fs.unlinkSync(path.join(__dirname, `../uploads/events/${userID}/${filename}`));
	// 	return await EventSchema.findByIdAndUpdate(eventID, targetEvent, {new: true}).select(["-__v"]);
	// }
}