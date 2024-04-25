import {useDispatch} from "react-redux";
import {modalOperations} from "../store/modal";
import {userOperations} from "../store/user";
import {useHistory} from "react-router-dom";

export default function useChangeUserClose() {
    const dispatch = useDispatch();
    const history = useHistory();

    const closeFunc = () => {
        dispatch(modalOperations.toggleModalOperation(false));
        dispatch(userOperations.isSubmitClickOperation(false));
        dispatch(userOperations.isPhotoredactorOpenOperation(false));
        dispatch(userOperations.isChangeUserOpenOperation(false));
        history.push("/home/profile");
    };

    return {
        changeUserClose: () => closeFunc(),
    }

};
