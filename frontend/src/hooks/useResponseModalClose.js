import {useDispatch} from "react-redux";
import {modalOperations} from "../store/modal";
import {eventOperations} from "../store/event";



const useResponseModalClose = () => {
    const dispatch = useDispatch();

   return () => {
        dispatch(modalOperations.toggleModalOperation(false));
        dispatch(eventOperations.getCurrentEventOperation(null));
    };

};

export default useResponseModalClose;