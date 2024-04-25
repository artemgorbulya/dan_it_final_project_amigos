import MessageService from "../../services/MessageService"

export default (socket, ws) => {
	socket.on("deleteChat", async ({chatroomID}) => {
		const deletedChatroomID = await MessageService.deleteChatroom(chatroomID);
		ws.in(deletedChatroomID).emit("deleteChat", deletedChatroomID);
	})
}