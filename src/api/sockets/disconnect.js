import UserService from "../../services/UserService";

export default (socket, ws) => {
	socket.on("disconnect", async () => {
		await UserService.setLastSeen(socket.user.userID);

		const disconnectedUsers = [];
		ws.sockets.sockets.forEach(client => disconnectedUsers.push(client.user.userID));
		ws.sockets.sockets.forEach(socket => socket.emit("usersOnline", disconnectedUsers));
	})
}