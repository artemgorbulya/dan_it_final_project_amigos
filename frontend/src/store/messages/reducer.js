import types from "./types";

const initialState = {
	typingChatrooms: [],
	chatrooms: [],
}

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.ADD_CHATROOM: {
			return {
				...state,
				chatrooms: [...state.chatrooms.filter(chatroom => chatroom._id !== action.payload._id), action.payload]
					.sort((a, b) => a.messages[a.messages.length - 1]?.sendDate < b.messages[b.messages.length - 1]?.sendDate ? 1 : -1)
			}
		}

		case types.ADD_CHATS: 
			return {...state, chatrooms: action.payload}

		case types.DELETE_DATA: 
			return {...initialState}

		case types.SET_TYPING_STATUS: {
			if (action.payload.status) {
				return {...state, typingChatrooms: [...state.typingChatrooms, action.payload.chatroomID]}
			}
			return {...state, typingChatrooms: state.typingChatrooms.filter(id => id !== action.payload.chatroomID)}
		}

		case types.DELETE_CHATROOM: {
			return {
				typingChatrooms: state.typingChatrooms.filter(cr => cr !== action.payload),
				chatrooms: state.chatrooms.filter(cr => cr._id !== action.payload),
			}
		}
		default: 
			return state;
	}
}