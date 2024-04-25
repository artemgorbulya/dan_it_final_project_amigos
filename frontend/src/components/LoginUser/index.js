import React, {memo, useEffect, useRef} from 'react';
import FormComponent from "../FormComponent";
import ValidationLogin from "../LoginUser/ValidationLogin";
import Button from "../Button";
import Input from "../Input";
import styles from "./LoginUser.module.scss"
import axios from "axios";
import {useDispatch} from "react-redux";
import {userOperations} from "../../store/user";
import {Link, useHistory} from "react-router-dom";
import HomePagesTitle from "../HomePagesTitle";
import useErrorActions from "../../hooks/useErrorActions";
import Modal from "../Modal";

const LoginUser = () => {
    const dispatch = useDispatch();
    const unmounted = useRef(false);
    const history = useHistory();
    const {catchEr, errorStatus, errorText, closeElement} = useErrorActions();

    const onSubmitClick = ()=>{
        dispatch(userOperations.isSubmitClickOperation(true));
    };
    useEffect(() => {
        return () => { unmounted.current = true }
    }, []);


    const formFields = [
        <Input className="input" key="8" label="E-MAIL" placeHolder="Ваш e-mail" type="text" name="email"/>,
        <Input className="input" type="password" key="10" label="ПАРОЛЬ" name="password"/>,
        <Button classList="form_button_submit" children={"ВОЙТИ"} type="submit" key="13" action={onSubmitClick} />
    ];
    const handleSubmit=(values)=>{
        const {
            email,
            password,
        }=values;

    axios.post( '/api/auth/login', {
            email: email,
            password: password,
        })
        .then(function (response) {
            // if (!unmounted.current) {
                localStorage.setItem('token', response.data.data.token);
                dispatch(userOperations.toggleIsAuthOperation(true));
                dispatch(userOperations.dataUserOperation(response.data.data.user));
                dispatch(userOperations.tokenOperation(response.data.data.token));
            // }
        })
        .then(() => history.push("/"))
        .catch(catchEr);

    };

    const initialValues={
        email: '',
        password: '',
    };

     return (
         <div className={styles.userLogin}>
             {/*{isAuth && <Redirect to={"/home/events/list"}/>}*/}

             <HomePagesTitle title='Войти в систему'/>

             <p className={styles.header_text}>
                 Войдите в существующий профиль или <Link to={'/register'}> зарегистрируйтесь </Link>
             </p>


             <div className={styles.content}>
                 <div className={styles.containerForm}>
                    <FormComponent
                        formFields={formFields}
                        initialValues={initialValues}
                        validationSchema={ValidationLogin}
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

export default memo(LoginUser);