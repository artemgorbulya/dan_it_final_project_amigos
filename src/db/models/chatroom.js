import mongoose from "mongoose";

const chatroomSchema = new mongoose.Schema({
  users: [{
		type: Number,
		required: true,
		ref: "User",
	}],
	messages: [{
		type: String,
		ref: "Message"
	}]
}, {
	timestamps: { createdAt: 'createDate', updatedAt: "updateDate" }
});

export default mongoose.model('Chatroom', chatroomSchema, "chatrooms");