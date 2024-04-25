import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Chatroom from '../components/Messages/Chatroom';
import MessagesList from '../components/Messages/MessagesList';

const MessageRoutes = () => {
	return (
		<Switch>
			<Route path="/home/messages/inbox" component={MessagesList} />
			<Route path="/home/messages/:chatroomID" component={Chatroom} />
		</Switch>
	)
};

export default MessageRoutes;