import React, {useState, memo} from 'react';
import styles from "../ChangeProfile.module.scss";
import Button from "../../Button";
import useChangeUserClose from "../../../hooks/useChangeUserClose";
import axios from "axios";
import {userOperations, userSelectors} from "../../../store/user";
import {useDispatch, useSelector} from "react-redux";
import useErrorActions from "../../../hooks/useErrorActions";
import {useHistory} from "react-router-dom"
import Modal from "../../Modal";
import FormComponent from "../../FormComponent";
import Input from "../../Input";
import * as yup from "yup";


const DeleteUser = () => {
    const history = useHistory();
    const {changeUserClose} = useChangeUserClose();
    const dataUser = useSelector(userSelectors.getDataUser);
    const {catchEr, closeElement, errorStatus, errorText} = useErrorActions();
    const dispatch = useDispatch();

    const [deleteUser, setDeleteUser] = useState(false);

    const ValidationPasswordDelete = yup.object().shape({
        password: yup
            .string()
            .trim()
            .required('This field is required')
            .min(8, 'min 8 symbol'),
    });
    const initialValues = {
        password: '',
    };

    const actionButton = () => {
        console.log("1");
        setDeleteUser(true);
        dispatch(userOperations.isSubmitClickOperation(true));

    };

    const deleteUserButton = (value) => {
        console.log(value)
        axios({
            method:'delete',
            url: `/api/users/${dataUser._id}`,
            data:{password: value.password},
        })
            .then(() => {
                changeUserClose()
            })
            .then(() => {
                history.push("/goodbye");
            })
            .catch((error) => {
                catchEr(error);
            });
    };

    const formFields=()=>{

        if (deleteUser)
        {
            dispatch(userOperations.isSubmitClickOperation(false));

            return ([
                <Input className="input" type="password" key="1" label="Введите пароль для подтверждения:" name="password"/>,
                <div className={styles.buttonBox} key="2">
                    <Button classList="form_button_submit form_width50 form_width50--left"
                            children="УДАЛИТЬ АККАУНТ"
                            type="submit"
                            action={actionButton}
                    />
                    <Button classList="close-button form_width50 form_width50--right" children="ОТМЕНА" type="reset" action={changeUserClose}/>
                </div>
            ])
        }
        else
            return([
            <div className={styles.buttonBox} key="2">
                <Button classList="form_button_submit form_width50 form_width50--left"
                        children="УДАЛИТЬ АККАУНТ"
                        type="submit"
                        action={actionButton}
                />
                <Button classList="close-button form_width50 form_width50--right" children="ОТМЕНА" type="reset" action={changeUserClose}/>
            </div>
        ])
    };


    return (
        <div>
            <div className={styles.textBox}>
                <div> Если Вам с нами не понравилось, Вы можете удалить свой аккаунт.
                    Вы уверены в своем решении? </div>
            </div>
            <div className={styles.containerForm}>
                <FormComponent
                    formFields={formFields()}
                    validationSchema={ValidationPasswordDelete}
                    initialValues={initialValues}
                    handleSubmit={deleteUserButton}
                    />
            </div>

            {errorStatus &&
            <Modal
                closeModal={closeElement}
                title='Ooops, ошибочка вышла : '
                children={errorText}
                actions={<Button classList={"form_button_submit form_submit_width100"} action={closeElement}
                                 children={"ЗАКРЫТЬ"}/>}
            />}
        </div>
    );
};

export default memo(DeleteUser);