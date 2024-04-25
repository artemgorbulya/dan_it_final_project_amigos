import React, { memo } from 'react';
import styles from "./ImageEl.module.scss"
import DeleteImg from "../DeleteImg";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {userOperations, userSelectors} from "../../store/user";

const ImageEl = (props) => {
    const {src, id, ref} = props;
    const dataUser = useSelector(userSelectors.getDataUser);
    const dispatch = useDispatch();
    const changeProfilePhoto = () =>{
        axios.put(`/api/users/${dataUser._id}/images`, {photoID: id})
            .then((response) =>
            {
                dispatch(userOperations.dataUserOperation(response.data.data));
            })
            .then((response) =>props.closeModal())
    };
    return (
        <div className={styles.imgBox}>
            <DeleteImg id={id}/>
            <img src={src} alt="" className={styles.img} ref={ref} onDoubleClick={changeProfilePhoto}/>
        </div>
    );
};

export default memo(ImageEl);