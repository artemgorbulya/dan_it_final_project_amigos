import { ChatroomSchema, MessageSchema, UserSchema } from "../db/models"

export default class MessageService {

	/**
	 * @desc Get chatroom object by its ID
	 * 
	 * @param {String} chatroomID 
	 */
	static changeChatroomByID = async (chatroomID, data) => {
		return await ChatroomSchema
		.findByIdAndUpdate(chatroomID, data, {new: true})
		.select(["-__v"])
		.populate("messages", ["-__v"])
		.populate("users", ["-password", "-__v"])
		.exec();
	}

	/** 
	 * @desc Create chatroom by 2 users and first sent message
	 * 
	 * @param {Array<Number>} UserIDs
	 * @param {String} message 
	 * @param {Number} author
	 */
	static createChatroom = async ({userIDs}) => {
		const chatroom = await ChatroomSchema.create({users: userIDs});

		userIDs.forEach(async id => {
			const user = await UserSchema.findById(id).exec();
			user.chatrooms.push(chatroom._id);
			return await UserSchema.findByIdAndUpdate(user._id, user).exec();
		});

		return await ChatroomSchema
			.findById(chatroom._id)
			.populate("users", ["-password", "-__v"])
			.select(["-__v"])
			.exec();
	}

	/**
	 * @desc Create message in a specific chatroom by its author and text
	 * 
	 * @param {String} chatroomID 
	 * @param {String} message
	 * @param {Number} author
	 */
	static createMessage = async ({chatroomID, message, author}) => {
		const createdMessage = await MessageSchema.create({message, author, readBy: [author]});
		const chatroom = await ChatroomSchema.findById(chatroomID).exec();
		chatroom.messages.push(createdMessage._id);

		return await MessageService.changeChatroomByID(chatroomID, chatroom);
	}

	/**
	 * @desc Get user's unread messages and chatrooms
	 * 
	 * @param {Number} userID
	 */
	static getUnreadMessages = async ({userID}) => {
		const user = await UserSchema
			.findById(userID)
			.populate({
				path: "chatrooms",
				select: ["-__v"],
				populate: {
					path: "messages",
					select: ["-__v"],
				}
			})
			.exec();

		return user.chatrooms.filter(chatroom => {
			return !!chatroom.messages.filter(msg => msg.readBy.indexOf(userID) !== -1).length;
		});
	}

	/**
	 * @desc Set unread messages in chatroom to read
	 * 
	 * @param {Number} userID
	 * @param {String} chatroomID 
	 */
	static readMessages = async ({userID, chatroomID}) => {
		const chatroom = await ChatroomSchema
			.findById(chatroomID)
			.populate("messages", ["-__v"])
			.populate("users", ["-password", "-__v"])
			.select(["-__v"])
			.exec();
		const unreadMessages = chatroom.messages.filter(msg => msg.readBy.indexOf(userID) === -1);

		const updatedMessages = await Promise.all(unreadMessages.map(async msg => {
			const message = await MessageSchema.findById(msg._id).exec();
			message.readBy.push(userID);
			return await MessageSchema.findByIdAndUpdate(msg._id, message, {new: true}).exec();
		}));

		chatroom.messages = [...chatroom.messages.filter(msg => msg.readBy.indexOf(userID) !== -1), ...updatedMessages];
		return chatroom;
	}

	/**
	 * @desc Get user chatrooms by its id value
	 * 
	 * @param {Number} userID 
	 */
	static getChatrooms = async (userID) => {
		const user = await UserSchema.findById(userID).exec();

		return await Promise.all(user.chatrooms.map(async chatroomID => {
			return await ChatroomSchema
				.findById(chatroomID)
				.select(["-__v"])
				.populate("users", ["-__v", "-password"])
				.populate("messages", ["-__v"])
				.exec();
		}));
	}

	/**
	 * @desc Deleting chatroom by its _id value
	 * 
	 * @param {String} chatroomID 
	 */
	static deleteChatroom = async (chatroomID) => {
		const chatroom = await ChatroomSchema.findById(chatroomID).exec();

		chatroom.users.forEach(async userID => {
			const user = await UserSchema.findById(userID).exec();
			const updatedChatrooms = user.chatrooms.filter(cr => cr !== chatroomID);
			await UserSchema.findByIdAndUpdate(userID, {chatrooms: updatedChatrooms});
		})

		chatroom.messages.forEach(async msgID => {
			await MessageSchema.findByIdAndDelete(msgID);
		})

		const deletedChatroom = await ChatroomSchema.findByIdAndDelete(chatroomID).exec();
		return deletedChatroom._id.toString();
	}
}