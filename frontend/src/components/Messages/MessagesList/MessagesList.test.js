import MessagesList from "./index";
import {renderWithRedux} from "../../../setupTests";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

jest.mock("../../Messages/MessageCover/index.js", () => () => <span>MessageCover</span>)

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

describe('Testing MessagesList component', () => {
	it('smoke test', () => {
		const store = mockedStore(initialState);
		renderWithRedux(<MessagesList />, store);
	});

	it('should render text if there are no chatrooms', () => {
		const store = mockedStore({
			...initialState,
			messages: {
				...initialState.messages,
				chatrooms: [],
			}
		});
		const {getByText} = renderWithRedux(<MessagesList />, store);
		getByText(/Сообщений нет/);
	});
	
	it('should render MessageCover component', () => {
		const store = mockedStore(initialState);
		const {getByText} = renderWithRedux(<MessagesList />, store);
		getByText(/MessageCover/);
	});
});