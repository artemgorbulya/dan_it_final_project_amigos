import MessageService from "../../services/MessageService"

export default (socket, ws) => {
	socket.on("sendMessage", async (data) => {
		// chatroomID, author, message
		const chatroom = await MessageService.createMessage(data);
		ws.in(chatroom._id.toString()).emit("sendMessage", chatroom);
	})
}