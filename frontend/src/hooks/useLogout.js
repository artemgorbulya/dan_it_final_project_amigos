import {useDispatch} from "react-redux";
import {userOperations} from "../store/user";
import {modalOperations} from "../store/modal";
import {messagesActions} from "../store/messages";
import {useSocket} from "./useSocket";
import { feedListActions } from "../store/feedList";

export default function  useLogout () {
    const dispatch = useDispatch();
    const socket = useSocket();

    return () => {
        console.log(socket);
        socket.close();
        dispatch(userOperations.toggleIsAuthOperation(false));
        dispatch(userOperations.dataUserOperation({}));
        dispatch(userOperations.tokenOperation(''));
        dispatch(modalOperations.toggleBurgerMenuOperation(false));
        dispatch(messagesActions.deleteData());
        dispatch(feedListActions.resetData());

        localStorage.removeItem('token');
    };
};

