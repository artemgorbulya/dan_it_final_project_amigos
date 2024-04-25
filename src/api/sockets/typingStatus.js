export default (socket, ws) => {
	socket.on("typingStatus", async (data) => {
		socket.to(data.chatroomID).emit("typingStatus", {chatroomID: data.chatroomID, status: data.status});
	})
}