import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
	message: {
		type: String,
		required: true,
		maxlength: 128,
	},
	sendDate: Number,
  author: {
		type: Number,
		required: true,
		ref: "User",
	},
	readBy: [{
		type: Number,
		ref: "User"
	}]
}, {
	timestamps: { createdAt: 'sendDate' }
});

export default mongoose.model('Message', messageSchema, "messages");