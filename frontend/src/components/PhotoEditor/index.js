import React, { memo } from 'react';
import {useSelector} from "react-redux";
import {userSelectors} from "../../store/user";
import ImageEl from "../ImageEl";
import styles from "./PhotoEditor.module.scss"
import PhotoEditorDownload from "../PhotoEditorDownload";
import useChangeUserClose from "../../hooks/useChangeUserClose";

const PhotoEditor = () => {
    const dataUser = useSelector(userSelectors.getDataUser);
    const {changeUserClose} = useChangeUserClose();

    const massPhotos = dataUser.photos.map((item,idMass)=>
        <ImageEl src={item.photoURL} id={item.photoID} key={idMass} closeModal={changeUserClose}/>
    );

    return (
        <div className={styles.photoEditor}>
            {massPhotos}
            <PhotoEditorDownload/>
        </div>
    );
};

export default memo(PhotoEditor);