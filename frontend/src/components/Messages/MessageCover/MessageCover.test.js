import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {renderWithRouterAndRedux} from '../../../setupTests';
import { getAge } from "../../../utils/mathHelpels";
import createFormattedDate from "../../../utils/dateFormat";
import MessageCover from "./index";

jest.mock("../../../hooks/useSocket.js", () => ({
	useSocket: () => ({
		emit: jest.fn(),
	}),
}));

jest.mock("../../DropdownList/index.js", () => () => <span>~~~~Dropdown~~~~</span>)

const mockedStore = configureStore([thunk]);
const initialState = {
	messages: {
		typingChatrooms: [],
		chatrooms: [
			{
				_id: "1",
				users: [
					{_id: 1},
					{
						_id: 2,
						firstName: "Oleg",
						birthday: 957474000, // 2000 may 05
						photos: [
							{photoURL: "photo-url"}
						],
						lastSeen: 1615398641, // Wed Mar 10 2021 17:50:41 GMT+0000
					}
				],
				messages: [
					{
						author: 2,
						message: "Msg",
						sendDate: 1615398641, // Wed Mar 10 2021 17:50:41 GMT+0000
						readBy: [1, 2],
					}
				]
			}
		]
	}
}

const props = {
	userID: 2, 
	name: "Oleg", 
	age: getAge(957474000), 
	avatar: "photo-url", 
	lastMessage: "Msg", 
	lastMessageDate: 1615398641, 
	isRead: false, 
	chatroomID: "1",
}

describe('Testing MessageCover component', () => {
	it('should render correctly', () => {
		const store = mockedStore(initialState);
		const {getByText, getByTestId} = renderWithRouterAndRedux(<MessageCover {...props} />, store, {initialEntries: ["/home/messages/inbox"], path: "/home/messages/inbox"});
		getByText(`${props.name}, ${props.age}`);
		getByText(props.lastMessage);
		getByTestId("unread-message");
		getByText("~~~~Dropdown~~~~");
		getByText(createFormattedDate(props.lastMessageDate));
	});

	it('should render message if its length is less than 20', () => {
		const store = mockedStore(initialState);
		const {getByText} = renderWithRouterAndRedux(<MessageCover {...props} />, store, {initialEntries: ["/home/messages/inbox"], path: "/home/messages/inbox"});
		getByText(props.lastMessage);
	});

	it('should render specified text if no message was given', () => {
		const store = mockedStore(initialState);
		const {getByText} = renderWithRouterAndRedux(<MessageCover {...props} lastMessage={null} />, store, {initialEntries: ["/home/messages/inbox"], path: "/home/messages/inbox"});
		getByText(/Начните общение!/);
	});

	it('should render three dots if message length is higher than 20', () => {
		const store = mockedStore(initialState);
		const lastMessage = "a".repeat(20);
		const {getByText} = renderWithRouterAndRedux(<MessageCover {...props} lastMessage={lastMessage} />, store, {initialEntries: ["/home/messages/inbox"], path: "/home/messages/inbox"});
		getByText(`${"a".repeat(16)}...`);
	});
	
	it('should show last message date correctly', () => {
		const store = mockedStore(initialState);
		const {getByTestId} = renderWithRouterAndRedux(<MessageCover {...props} lastMessageDate={null} />, store, {initialEntries: ["/home/messages/inbox"], path: "/home/messages/inbox"});
		expect(getByTestId("message-date")).not.toHaveTextContent();
	});
})
