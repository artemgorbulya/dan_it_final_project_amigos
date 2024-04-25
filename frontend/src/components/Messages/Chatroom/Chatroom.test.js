import React from "react";
import Chatroom from "./index";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {renderWithRouterAndRedux} from '../../../setupTests';
import { getAge } from "../../../utils/mathHelpels";
import createFormattedDate from "../../../utils/dateFormat";
import userEvent from "@testing-library/user-event";

jest.mock("../../Loader/index.js", () => () => <span>Loader</span>)
jest.mock("../../../hooks/useSocket.js", () => ({
	useSocket: () => ({
		emit: jest.fn(),
	}),
}));

const mockedStore = configureStore([thunk]);
const initialState = {
	user: {
		usersOnline: [],
		dataUser: {
			_id: 1,
		}
	},
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

beforeAll(() => {
	window.HTMLElement.prototype.scrollIntoView = () => {};
})

describe('testing Chatroom component', () => {
	it('should render Loader if no chatroom was found', () => {
		const store = mockedStore(initialState);
		const {getByText} = renderWithRouterAndRedux(<Chatroom />, store)
		getByText(/Loader/);
	});

	it('should render chatroom properly with id', () => {
		const store = mockedStore(initialState);
		const {getByText} = renderWithRouterAndRedux(<Chatroom />, store, {initialEntries: [`/home/messages/1`], path: '/home/messages/:chatroomID'})
		getByText(/Msg/);
		getByText(`Oleg, ${getAge(957474000)}`);
	});

	it('should render not typing status correctly', () => {
		const store = mockedStore(initialState);
		const {queryByText} = renderWithRouterAndRedux(<Chatroom />, store, {initialEntries: [`/home/messages/1`], path: '/home/messages/:chatroomID'})
		expect(queryByText(/Печатает.../)).toBeNull();
	});

	it('should render typing status correctly', () => {
		const store = mockedStore({
			...initialState,
			messages: {
				...initialState.messages,
				typingChatrooms: ["1"],
			}
		});
		const {getByText} = renderWithRouterAndRedux(<Chatroom />, store, {initialEntries: [`/home/messages/1`], path: '/home/messages/:chatroomID'})
		getByText(/Печатает.../);
	});

	it('should show a title if no messages were sent', () => {
		const store = mockedStore({
			...initialState,
			messages: {
				...initialState.messages,
				chatrooms: [
					{
						_id: "1",
						users: [
							{_id: 1},
							{
								_id: 2,
								firstName: "Oleg",
								birthday: 957474000, // 2020 may 05
								photos: [
									{photoURL: "photo-url"}
								]
							}
						],
						messages: [],
					}
				]
			}
		});
		const {getByText} = renderWithRouterAndRedux(<Chatroom />, store, {initialEntries: [`/home/messages/1`], path: '/home/messages/:chatroomID'})
		getByText(/Начните общение!/);
	});

	it('should show online status', () => {
		const store = mockedStore({
			...initialState,
			user: {
				...initialState.user,
				usersOnline: [2],
			}
		});
		const {getByText} = renderWithRouterAndRedux(<Chatroom />, store, {initialEntries: [`/home/messages/1`], path: '/home/messages/:chatroomID'})
		getByText(/В сети/);
	});

	it('should hide online status if user is writing', () => {
		const store = mockedStore({
			user: {
				...initialState.user,
				usersOnline: [2],
			},
			messages: {
				...initialState.messages,
				typingChatrooms: ["1"],
			}
		});
		const {getByText, queryByText} = renderWithRouterAndRedux(<Chatroom />, store, {initialEntries: [`/home/messages/1`], path: '/home/messages/:chatroomID'})
		getByText(/Печатает.../);
		expect(queryByText(/В сети/)).toBeNull();
	});

	it('should show last date being online', () => {
		const store = mockedStore(initialState);
		const {getByText} = renderWithRouterAndRedux(<Chatroom />, store, {initialEntries: [`/home/messages/1`], path: '/home/messages/:chatroomID'})
		getByText(`В сети ${createFormattedDate(1615398641)}`);
	});
	
	it('should contain less or equal than 128 symbols in input', async () => {
		const store = mockedStore(initialState);
		const {getByRole, findByDisplayValue} = renderWithRouterAndRedux(<Chatroom />, store, {initialEntries: [`/home/messages/1`], path: '/home/messages/:chatroomID'});

		userEvent.type(getByRole("textbox"), "a".repeat(128));
		expect(await findByDisplayValue("a".repeat(128))).toBeInTheDocument();
		userEvent.type(getByRole("textbox"), "a".repeat(1));
		expect(await findByDisplayValue("a".repeat(128))).toBeInTheDocument();
	});
})
