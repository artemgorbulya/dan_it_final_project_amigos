import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';
import { messagesActions } from '../store/messages';
import { socketActions } from '../store/socket';
import {userOperations, userSelectors} from "../store/user";

const SocketContext = React.createContext(null);

const Socket = ({children}) => {
	const [socket, setSocket] = useState(null);
	const user = useSelector(userSelectors.getDataUser);
	const token = useSelector(userSelectors.getToken);
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		if (token && user?._id && !socket) {
			const socket = io({
				auth: { 
					token, 
				},
			});
			socket.on("initConnection", (res) => {
				if (res?.success) {
					dispatch(socketActions.setConnectionStatus(true));
					socket.emit("getChats", user._id);
					setSocket(socket);
				}
			});
			socket.on("getChats", res => {
				dispatch(messagesActions.addChats(res));
			})
			socket.on("usersOnline", res => {
				dispatch(userOperations.setUsersOnlineOperation(res));
			});
			socket.on("createChatroom", res => {
				dispatch(messagesActions.addChatroom(res));
				history.push(`/home/messages/${res._id}`);
			})
			socket.on("sendMessage", res => {
				dispatch(messagesActions.addChatroom(res));
			})
			socket.on("readMessages", res => {
				dispatch(messagesActions.addChatroom(res));
			})
			socket.on("typingStatus", res => {
				dispatch(messagesActions.setTypingStatus(res));
			})
			socket.on("deleteChat", res => {
				dispatch(messagesActions.deleteChatroom(res));
			})
			socket.on("disconnect", () => setSocket(null));
		}
	}, [dispatch, history, socket, token, user?._id])

	return (
		<SocketContext.Provider value={socket}>
			{children}
		</SocketContext.Provider>
	)
}

export default Socket;
export {SocketContext};