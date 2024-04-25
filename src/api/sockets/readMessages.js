import MessageService from "../../services/MessageService"

export default (socket, ws) => {
	socket.on("readMessages", async (data) => {
		const chatroom = await MessageService.readMessages(data);
		ws.in(chatroom._id.toString()).emit("readMessages", chatroom);
	})
}