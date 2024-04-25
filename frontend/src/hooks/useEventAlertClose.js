import {useDispatch} from "react-redux";
import {modalOperations} from "../store/modal";
import {eventOperations} from "../store/event";

export default function useEventAlertClose(){
    const dispatch = useDispatch();

    return () => {
        dispatch(modalOperations.toggleAlertOperation(false));
        dispatch(modalOperations.toggleModalOperation(false));
        dispatch(eventOperations.getCurrentEventOperation(null));
        dispatch(eventOperations.getCurrentUserOperation(null));

    };

}