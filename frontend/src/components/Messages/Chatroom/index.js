import React, { memo, useEffect, useRef } from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import styles from "./Chatroom.module.scss";
import {Form, Formik} from "formik";
import Button from "../../Button";
import MessageInput from '../MessageInput';
import Message from '../Message';
import { useSocket } from '../../../hooks/useSocket';
import { useSelector } from 'react-redux';
import { messagesSelectors } from '../../../store/messages';
import { userSelectors } from '../../../store/user';
import { getAge } from '../../../utils/mathHelpels';
import * as yup from "yup";
import {GO_BACK_ICON, SEND_MESSAGE_ICON} from "../../../assets/svg/svg";
import Loader from '../../Loader';
import createFormattedDate from '../../../utils/dateFormat';

const validateInput = yup.object({
	message: yup
		.string()
		.trim()
		.max(128)
		.required()
});

const Chatroom = () => {
	const params = useParams();

	const chatroom = useSelector(messagesSelectors.getChatrooms).find(cr => cr._id === params.chatroomID);
	const isTyping = !!useSelector(messagesSelectors.getTypingStatus).includes(params.chatroomID);
	const user = useSelector(userSelectors.getDataUser);
	const usersOnline = useSelector(userSelectors.getUsersOnline);
	const history = useHistory();

	const socket = useSocket();
	const lastMessage = useRef(null);

	useEffect(() => {
		if (chatroom?.messages?.filter?.(msg => !msg.readBy.includes(user._id)).length) {
			socket.emit("readMessages", {userID: user._id, chatroomID: chatroom._id});
		}
	})
	useEffect(() => {
		lastMessage?.current?.scrollIntoView();
	}, [chatroom?.messages?.length]);

	const createMessages = () => {
		const msgData = chatroom?.messages?.map?.((msg, index) => {
			return index + 1 === chatroom.messages.length ? 
			<Message 
				ref={lastMessage}
				key={index}
				text={msg.message} 
				date={msg.sendDate}
				isMine={msg.author === user._id} 
			/> :
			<Message 
				key={index}
				text={msg.message} 
				date={msg.sendDate}
				isMine={msg.author === user._id} 
			/>
		}) 
		return msgData?.length ? msgData : <div className={styles.hintWrapper}>
			<p className={styles.hintTitle}>
				<span>Начните общение!</span> 
				<span className={styles.hintSubtitle}>Отправьте первое сообщение прямо сейчас</span>
			</p>
			<img className={styles.hintImage} src="/GoodBye.png" alt=""/>
		</div>
	}

	const secondUser = chatroom?.users.find(chatUser => chatUser._id !== user._id);
	const lastSeenDate = createFormattedDate(secondUser?.lastSeen);

	return !chatroom ? <Loader /> : (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Button action={() => history.goBack()} classList="goback-msg-btn">
					{GO_BACK_ICON}
				</Button>
				<div className={styles.userInfo}>
					<div className={styles.userData}>
						<Link to={`/home/profile/${secondUser._id}`}>
							<h2 className={styles.userName}>{secondUser.firstName.trim()}, {getAge(secondUser.birthday)}</h2>
						</Link>
						<span className={styles.onlineStatus}>
							{isTyping ? 
								<span className={styles.typingText}>Печатает...</span> : 
								usersOnline.includes(secondUser._id) ? 
									"В сети" : 
									lastSeenDate ? `В сети ${lastSeenDate}` : ""
							}
						</span>
					</div>
					<Link to={`/home/profile/${secondUser._id}`}>
						<div className={styles.userAvatar} style={{backgroundImage: `url(${secondUser.photos[0].photoURL})`}} />
					</Link>
				</div>
			</div>
			<div className={styles.chatWrapper}>
				<div className={styles.chatField}>
					{createMessages()}
					{lastMessage.current && 
						chatroom.messages[chatroom.messages.length - 1].readBy.includes(secondUser._id) &&
						chatroom.messages[chatroom.messages.length - 1].author === user._id ? <p className={styles.messageRead}>Прочитано</p> : null}
				</div>
				<div className={styles.chatInput}>
					<Formik
						initialValues={{
							message: "",
						}}
						validationSchema={validateInput}
						validateOnChange
						onSubmit={(values, {resetForm}) => {
							resetForm();
							socket.emit("sendMessage", {
								chatroomID: params.chatroomID,
								message: values.message,
								author: user._id,
							})
						}}
					>
						{({handleSubmit, handleChange}) => (
							<Form>
								<MessageInput 
									name="message"
									placeholder="Введите сообщение"
									onChange={(e) => {
										if (e.target.value.length > 128) return;
										handleChange(e);
										if (!e.target.value.trim()) {
											socket.emit("typingStatus", {
												chatroomID: params.chatroomID,
												status: false,
											})
										} else {
											socket.emit("typingStatus", {
												chatroomID: params.chatroomID,
												status: true,
											})
										}
									}}
									onBlur={() => {
										socket.emit("typingStatus", {
											chatroomID: params.chatroomID,
											status: false,
										})
									}}
								/>
								<Button classList="message-btn" action={handleSubmit}>{SEND_MESSAGE_ICON}</Button>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	)
}

export default memo(Chatroom);