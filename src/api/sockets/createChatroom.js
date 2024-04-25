import MessageService from "../../services/MessageService"
import StatusService from "../../services/StatusService";

export default (socket, ws) => {
	socket.on("createChatroom", async (data) => {
		const createdChatroom = await MessageService.createChatroom(data);
		socket.join(createdChatroom._id.toString());
		ws.in(createdChatroom._id.toString()).emit("createChatroom", createdChatroom);
	})
}