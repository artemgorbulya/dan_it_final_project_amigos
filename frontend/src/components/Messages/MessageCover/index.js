import React, { memo } from 'react';
import DropdownList from '../../DropdownList';
import styles from "./MessageCover.module.scss";
import { Link } from 'react-router-dom';
import { useSocket } from '../../../hooks/useSocket';
import { useSelector } from 'react-redux';
import createFormattedDate from '../../../utils/dateFormat';
import { messagesSelectors } from '../../../store/messages';
import {DELETE_ICON} from "../../../assets/svg/svg";

const MessageCover = ({userID, name, age, avatar, lastMessage, lastMessageDate, isRead, chatroomID}) => {
	const socket = useSocket();
	const chatroom = useSelector(messagesSelectors.getChatrooms).find(cr => cr._id === chatroomID);

	const deleteChat = () => {
		socket.emit("deleteChat", {chatroomID});
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<div className={styles.userBlock}>
					<Link to={`/home/profile/${userID}`}>
						<div className={styles.userAvatar} style={{backgroundImage: `url(${avatar})`}} />
					</Link>
					<div className={styles.messageData}>
						<Link to={`/home/profile/${userID}`} className={!isRead && !!chatroom.messages.length ? styles.userNameUnread : styles.userName}>
								{name}, {age}
								{!isRead && !!chatroom.messages.length && <div data-testid="unread-message" className={styles.circle}></div>}
						</Link>
						<Link to={`/home/messages/${chatroomID}`} className={!isRead && !!chatroom.messages.length ? styles.boldMessage : styles.message}>
							{!lastMessage ? "Начните общение!" : 
								lastMessage.length < 20 ? lastMessage : `${[...lastMessage].filter((i, index) => index < 16).join("")}...`}
						</Link>
					</div>
				</div>
				<div className={styles.infoBlock}>
					<DropdownList 
						stickedTop
						options={[
							<div onClick={deleteChat} className={styles.dropdown}>
								{DELETE_ICON} Удалить
							</div>]}
						/>
					<p className={styles.dateInfo} data-testid="message-date">
						{!lastMessageDate ? "" : createFormattedDate(lastMessageDate)}
					</p>
				</div>
			</div>
		</div>
	)
}

export default memo(MessageCover);