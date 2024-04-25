import React, {memo} from 'react';
import styles from './MyProfile.module.scss';
import MyProfileLang from '../MyProfileLang';
import PropTypes from 'prop-types';
import {modalOperations, modalSelectors} from "../../store/modal";
import {userOperations, userSelectors} from "../../store/user";
import {useDispatch, useSelector} from "react-redux";
import Modal from "../Modal";
import ChangeProfile from "../ChangeProfile";
import PhotoEditor from "../PhotoEditor";
import useChangeUserClose from "../../hooks/useChangeUserClose";
import HeaderChangeProfile from "../ChangeProfile/HeaderChangeProfile";
import Slider from '../Slider';
import {eventOperations} from "../../store/event";

const MyProfile = () => {

    const {changeUserClose} = useChangeUserClose();
    const dispatch = useDispatch();
    const modalData = useSelector(modalSelectors.getModalOpen);
    const dataUser = useSelector(userSelectors.getDataUser);
    const changeUserOpen = useSelector(userSelectors.getIsChangeUserOpen);
    const photoRedactorOpen = useSelector(userSelectors.getIsPhotoredactorOpen);

    const changeUserOpenModal = () => {
        dispatch(eventOperations.getCurrentEventOperation(null));
        dispatch(userOperations.isChangeUserOpenOperation(true));
        dispatch(modalOperations.toggleModalOperation(true));
    };
    const photoRedactorOpenModal = () => {
        dispatch(eventOperations.getCurrentEventOperation(null));
        dispatch(userOperations.isPhotoredactorOpenOperation(true));
        dispatch(modalOperations.toggleModalOperation(true));
    };

    const userLanguage = dataUser.languages.map((item, index) =>
        <MyProfileLang key={index}>{item}</MyProfileLang>
    );

    return (
        <>
            {changeUserOpen && modalData &&
            <Modal closeModal={changeUserClose} title='Редактировать профиль' menu={<HeaderChangeProfile/>}
                   children={<ChangeProfile/>} notCloseBack={true}/>}
            {photoRedactorOpen && modalData &&
            <Modal closeModal={changeUserClose} title='Редактировать фото' children={<PhotoEditor/>}
                   notCloseBack={true}/>}

            <Slider user={dataUser} changeUser={changeUserOpenModal} changePhoto={photoRedactorOpenModal}/>

            <div className={styles.aboutWrapper}>
                {(dataUser.about!=="") && (dataUser.about!==undefined) &&
                    <div>
                        <div className={styles.title}>обо мне</div>
                        <div className={styles.text}>{dataUser.about}</div>
                    </div>
                }
                {userLanguage.length!==0 &&
                    <div>
                        <div className={styles.title}>языки</div>
                        <div className={styles.languageWrapper}>
                            {userLanguage}
                        </div>
                    </div>
                }
            </div>
        </>
    )
};

MyProfile.propTypes = {
    id: PropTypes.number,
    profilePhoto: PropTypes.string,
    name: PropTypes.string,
    age: PropTypes.number,
    location: PropTypes.string,
    about: PropTypes.string,

};

MyProfile.defaultProps = {
    id: 9999999,
    profilePhoto: '/profile/myprofile-def.png',
    name: 'NoName',
    age: 18,
    location: 'unknown location',
    about: 'Unknown information.',

};

export default memo(MyProfile);