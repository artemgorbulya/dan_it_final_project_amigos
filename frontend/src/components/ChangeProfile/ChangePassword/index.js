import React, {memo, useEffect, useRef} from 'react';
import styles from "../ChangeProfile.module.scss";
import FormComponent from "../../FormComponent";
import {formFields, InitialValues} from "./ConstChangePassword";
import ValidationChangePassword from "./ValidationChangePassword";
import useChangeUserClose from "../../../hooks/useChangeUserClose";
import {userOperations, userSelectors} from "../../../store/user";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import useErrorActions from "../../../hooks/useErrorActions";
import Modal from "../../Modal";
import Button from "../../Button";


const ChangePassword = () => {
    const dispatch = useDispatch();
    const {changeUserClose} = useChangeUserClose();
    const dataUser = useSelector(userSelectors.getDataUser);
    const unmounted = useRef(false);
    const {catchEr, closeElement, errorStatus, errorText} = useErrorActions();

    const onSubmitClick = () => {
        dispatch(userOperations.isSubmitClickOperation(true));
    };  //Функция отслеживания 1-го нажатия на кнопку Submit, без валидации

    useEffect(() => {
        return () => {
            unmounted.current = true
        }
    }, []);

    const handleSubmit = (values) => {
        const {newPassword, oldPassword} = values;

        axios.put(`/api/users/${dataUser._id}/password`,
            {
                oldPassword: oldPassword,
                newPassword: newPassword,
            })
            .then((response) => {
                if (!unmounted.current) {
                    dispatch(userOperations.dataUserOperation(response.data.data));
                }
            })
            .then(() => {
                changeUserClose()
            })
            .then(() => {
                dispatch(userOperations.isSubmitClickOperation(false));
            })
            .catch((error) => {
                catchEr(error);
            })
    };

    return (
        <div className={styles.containerForm}>
            <FormComponent
                formFields={formFields(onSubmitClick, changeUserClose)}
                initialValues={InitialValues()}
                validationSchema={ValidationChangePassword}
                handleSubmit={handleSubmit}
            />
            {errorStatus &&
            <Modal
                closeModal={closeElement}
                title='Ooops, ошибочка вышла : '
                children={errorText}
                actions={<Button classList={"form_button_submit form_submit_width100"} action={closeElement} children={"ЗАКРЫТЬ"}/>}
            />}
        </div>
    );
};

export default memo(ChangePassword);