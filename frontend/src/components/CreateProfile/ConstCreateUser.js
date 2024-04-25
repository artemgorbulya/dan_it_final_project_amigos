import React from 'react';
import Input from "../Input";
import SexRadio from "../SexRadio";
import DataSelect from "../DateSelect";
import Button from "../Button";

export const formFields= (actionButton) => {
    return (
        [
            <Input className="input" label="ВАШЕ ИМЯ" type="text" key="1" name="firstName"/>,
            <Input className="input" label="ВАША ФАМИЛИЯ" type="text" key="2" name="lastName"/>,
            <SexRadio key="3" label="ПОЛ"/>,
            <DataSelect key="4" label="ДАТА РОЖДЕНИЯ" className="dataSelect"/>,
            <Input className="input" placeHolder="Ваша страна" label="СТРАНА" key="5" type="text" name="country"/>,
            <Input className="input" placeHolder="Ваш город" label="ГОРОД" key="6" type="text" name="city"/>,
            <Input className="input" key="7" label="НОМЕР МОБИЛЬНОГО ТЕЛЕФОНА" placeHolder="Ваш номер телефона"
                   type="text" name="mobile"/>,
            <Input className="input" key="8" label="E-MAIL" placeHolder="Ваш e-mail" type="text" name="email"/>,
            <Input className="input" type="password" key="10" label="ПАРОЛЬ" name="password"/>,
            <Input className="input" type="password" key="12" label="ПОВТОРИТЕ ПАРОЛЬ" name="confirmPassword"/>,
            <Button classList="form_button_submit" children="ПРОДОЛЖИТЬ" type="submit" key="13" action={actionButton}/>
        ]);
}
export const initialValues={
    firstName: '',
    lastName:'',
    sex: '',
    selectMonth: '',
    selectDate: '',
    selectYear: '',
    country:'',
    city: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
};

