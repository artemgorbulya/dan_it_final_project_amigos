import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { messagesSelectors } from "../store/messages";
import { userSelectors } from "../store/user";
import { useSocket } from "./useSocket";

const useChatroom = () => {
	const chatrooms = useSelector(messagesSelectors.getChatrooms);
	const user = useSelector(userSelectors.getDataUser);
	const history = useHistory();
	const socket = useSocket();

	return (userID) => {
		const chatroom = chatrooms.find(chatroom => chatroom.users.find(user => user._id === userID));
		if (chatroom) {
			history.push(`/home/messages/${chatroom._id}`);
		} else {
			socket.emit("createChatroom", {
				userIDs: [userID, user._id],
				author: user._id,
			});
		}
	}
}

export default useChatroom;