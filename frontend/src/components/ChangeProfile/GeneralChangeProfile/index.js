import React, {memo, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {userOperations, userSelectors} from "../../../store/user";
import {formFields, InitialValues} from "./ConstGeneralChangeProfile";
import axios from "axios";
import styles from "../ChangeProfile.module.scss";
import FormComponent from "../../FormComponent";
import ValidationGeneralChangeProfile from "./ValidationGeneralChangeProfile";
import useChangeUserClose from "../../../hooks/useChangeUserClose";
import useErrorActions from "../../../hooks/useErrorActions";
import Modal from "../../Modal";
import Button from "../../Button";
import {getTime} from "date-fns";


const GeneralChangeProfile = (props) => {
    const dispatch = useDispatch();
    const unmounted = useRef(false);
    const dataUser = useSelector(userSelectors.getDataUser);
    const {catchEr, closeElement, errorStatus, errorText} = useErrorActions();
    const {changeUserClose} = useChangeUserClose();

    const onSubmitClick = () => {
        dispatch(userOperations.isSubmitClickOperation(true));
    };  //Функция отслеживания 1-го нажатия на кнопку Submit, без валидации

    useEffect(() => {
        return () => {
            unmounted.current = true
        }
    }, []);

    const handleSubmit = (values) => {

        const {
            firstName,
            lastName,
            country,
            city,
            mobile,
            languages,
            selectYear,
            selectMonth,
            selectDate,
            about
        } = values;

        const birthday = getTime(new Date(selectYear, selectMonth, selectDate));

        axios.put(`/api/users/${dataUser._id}`,
                {
                    firstName: firstName,
                    lastName: lastName,
                    birthday: birthday,
                    country: country,
                    city: city,
                    mobile: mobile,
                    languages: languages,
                    about: about,
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
                catchEr(error)
            })
    };



    return (

        <div className={styles.containerForm}>
            <FormComponent
                formFields={formFields(onSubmitClick,changeUserClose)}
                initialValues={InitialValues()}
                validationSchema={ValidationGeneralChangeProfile}
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
    );


};

export default memo(GeneralChangeProfile);