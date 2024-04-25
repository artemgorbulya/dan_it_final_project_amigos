const getIsAuth = state => state.user.isAuth;
const getDataUser = state => state.user.dataUser;
const getToken = state => state.user.token;
const getIsChangeUserOpen = state => state.user.isChangeUserOpen;
const getIsPhotoredactorOpen = state => state.user.isPhotoredactorOpen;
const getIsSubmitClick = state => state.user.isSubmitClick;
const getUsersOnline = state => state.user.usersOnline;
const getUserId = state => state.user.userId;

export default {
    getIsAuth,
    getDataUser,
    getToken,
    getIsSubmitClick,
    getIsChangeUserOpen,
    getIsPhotoredactorOpen,
    getUsersOnline,
    getUserId
};