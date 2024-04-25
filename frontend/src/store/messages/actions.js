import types from "./types";

const addChatroom = (chatroomData) => dispatch => {
    dispatch({
        type: types.ADD_CHATROOM,
        payload: chatroomData,
    })
}

const addChats = (chatsData) => dispatch => {
    dispatch({
        type: types.ADD_CHATS,
        payload: chatsData,
    })
}

const deleteData = () => ({
    type: types.DELETE_DATA
})

const setTypingStatus = (data) => ({
    type: types.SET_TYPING_STATUS,
    payload: data,
})

const deleteChatroom = (chatroomID) => ({
    type: types.DELETE_CHATROOM,
    payload: chatroomID,
})

export default {
    addChatroom,
    addChats,
    deleteData,
    setTypingStatus,
    deleteChatroom,
}