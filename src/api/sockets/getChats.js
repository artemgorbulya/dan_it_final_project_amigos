import MessageService from "../../services/MessageService"

export default (socket, ws) => {
	socket.on("getChats", async (data) => {
		const chatrooms = await MessageService.getChatrooms(data);
		chatrooms.forEach(chatroom => socket.join(chatroom._id.toString()));
		socket.emit("getChats", chatrooms);

		const connectedUsers = [];
		ws.sockets.sockets.forEach(client => connectedUsers.push(client.user.userID));
		ws.sockets.sockets.forEach(socket => socket.emit("usersOnline", connectedUsers));
	})
}