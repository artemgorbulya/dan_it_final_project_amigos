import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { messagesSelectors } from '../../../store/messages';
import { userSelectors } from '../../../store/user';
import MessageCover from '../MessageCover';
import styles from "./MessagesList.module.scss";
import {getAge} from "../../../utils/mathHelpels";

const MessagesList = () => {
	const chatrooms = useSelector(messagesSelectors.getChatrooms);
	const user = useSelector(userSelectors.getDataUser);

	const createChatrooms = () => {
		return chatrooms.length ? chatrooms?.map?.(chatroom => {
			return chatroom?.users?.filter?.(chatUser => chatUser._id !== user._id).map((chatUser, index) => (
				<MessageCover
					key={index}
					userID={chatUser._id}
					name={chatUser.firstName.trim()}
					age={getAge(chatUser.birthday)}
					chatroomID={chatroom._id}
					lastMessage={chatroom.messages[chatroom.messages.length - 1]?.message}
					lastMessageDate={chatroom.messages[chatroom.messages.length - 1]?.sendDate}
					avatar={chatUser.photos[0].photoURL}
					isRead={!!chatroom.messages[chatroom.messages.length - 1]?.readBy?.find?.(userID => userID === user._id)}
				/>
			))
		}) : <p className={styles.noMessages}>Сообщений нет</p>;
	}

	return (
		<div className={styles.wrapper}>
			{createChatrooms()}
		</div>
	)
}

export default memo(MessagesList);