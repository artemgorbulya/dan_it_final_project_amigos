import jwt from "jsonwebtoken";
import io from "socket.io";
import createChatroom from "../api/sockets/createChatroom";
import CONFIG from "../config";
import RequestError from "../errors/RequestError";
import sendMessage from "../api/sockets/sendMessage";
import getChats from "../api/sockets/getChats";
import readMessages from "../api/sockets/readMessages";
import typingStatus from "../api/sockets/typingStatus";
import disconnect from "../api/sockets/disconnect";
import deleteChat from "../api/sockets/deleteChat";

const createConnection = (server) => {
	const ws = io(server);

	ws.use((socket, next) => {
		const token = socket.handshake.auth?.token?.split(" ")[1];

		if (!token) {
			return next(new RequestError("Auth failed!"));
		} else {
			jwt.verify(token, CONFIG.JWT_SECRET, (err, user) => {
				if (err) return next(new RequestError("Token is incorrect!"));
				socket.user = user;
				next();
			})
		}
	}).on("connection", (socket) => {
		socket.emit("initConnection", {success: true});
		getChats(socket, ws);
		createChatroom(socket, ws);
		sendMessage(socket, ws);
		readMessages(socket, ws);
		typingStatus(socket, ws);
		disconnect(socket, ws);
		deleteChat(socket, ws);
	})
}

export default createConnection;