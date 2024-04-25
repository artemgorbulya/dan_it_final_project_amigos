const getChatrooms = state => state.messages.chatrooms;
const getTypingStatus = state => state.messages.typingChatrooms;

export default {
    getChatrooms,
    getTypingStatus
};