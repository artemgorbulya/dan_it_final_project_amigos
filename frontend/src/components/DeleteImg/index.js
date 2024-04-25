import React, {memo, useRef} from 'react';
import styles from "./DeleteImg.module.scss"
import axios from "axios";
import {userOperations, userSelectors} from "../../store/user";
import {useDispatch, useSelector} from "react-redux";

const DeleteImg = ({id}) => {
    const dispatch = useDispatch();
    const dataUser = useSelector(userSelectors.getDataUser);
    const unmounted = useRef(false);
    const deleteImg = () => {

        axios({
                method:'delete',
                url: `/api/users/${dataUser._id}/images`,
                data:{photoID: id}

        })

            .then((response) => {
                console.log (response);
                if (!unmounted.current) {
                    dispatch(userOperations.dataUserOperation(response.data.data));
                }

            })
            .catch((error) => {
                // Error 😨
                if (error.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                    console.log(error.response.data.message);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    /*
                     * The request was made but no response was received, `error.request`
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request and triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    };
    return (
        <div className={styles.closeImg} onClick={deleteImg}>
            X
        </div>
    );
};

export default memo(DeleteImg);