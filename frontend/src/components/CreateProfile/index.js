import React, {useEffect, useRef, memo} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import styles from './CreateProfile.module.scss'
import FormComponent from "../FormComponent";
import ValidationCreateProfile from "./ValidationCreateProfile";
import {formFields, initialValues} from "./ConstCreateUser";
import HomePagesTitle from "../HomePagesTitle";
import {userOperations, userSelectors} from "../../store/user";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from 'react-router-dom';
import {getTime} from "date-fns";
import useErrorActions from "../../hooks/useErrorActions";
import Modal from "../Modal";
import Button from "../Button";

const CreateProfile = () => {
    const isAuth = useSelector(userSelectors.getIsAuth);
    const dispatch = useDispatch();
    const unmounted = useRef(false);
    const {catchEr, errorStatus, errorText, closeElement} = useErrorActions();

    useEffect(() => {
        return () => {
            unmounted.current = true
        }
    }, []);

    const actionButton = () => {
        dispatch(userOperations.isSubmitClickOperation(true));
    };

    const handleSubmit = (values) => {
        const {
            firstName,
            lastName,
            sex,
            selectMonth,
            selectDate,
            selectYear,
            country,
            city,
            mobile,
            email,
            password,
        } = values;

        const birthday = getTime(new Date(selectYear, selectMonth, selectDate));

        axios.post('api/auth/register', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            sex: sex,
            birthday: birthday,
            country: country,
            city: city,
            mobile: mobile,
        })
        .then(function (response) {
            if (!unmounted.current) {
                localStorage.setItem('token', response.data.data.token);
                dispatch(userOperations.toggleIsAuthOperation(true));
                dispatch(userOperations.dataUserOperation(response.data.data.user));
                dispatch(userOperations.tokenOperation(response.data.data.token));
            }
        })
        .catch(catchEr);
    };

    return (
        <div className={styles.createProfile}>
            {isAuth && <Redirect to={"/register/addphoto"}/>}
            <HomePagesTitle title='Создать профиль'/>
            <p className={styles.header_text}>
                Станьте частью сообщества или <Link to={'/login'}> войдите </Link> в существующий профиль.
            </p>
            <div className={styles.content}>
                <div className={styles.containerForm}>
                    <FormComponent
                        formFields={formFields(actionButton)}
                        initialValues={initialValues}
                        validationSchema={ValidationCreateProfile}
                        handleSubmit={handleSubmit}
                    />
                    {errorStatus &&
                    <Modal
                        closeModal={closeElement}
                        title='Ой, ошибочка вышла : '
                        children={errorText}
                        actions={<Button classList={"form_button_submit form_submit_width100"} action={closeElement} children={"ЗАКРЫТЬ"}/>}
                    />}

                </div>
            </div>
        </div>
    );
};

export default memo(CreateProfile);