import {useSelector} from "react-redux";
import {userSelectors} from "../../../store/user";
import Input from "../../Input";
import DataSelect from "../../DateSelect";
import TextArea from "../../TextArea";
import SelectMulti from "../../SelectMulti";
import styles from "../ChangeProfile.module.scss";
import Button from "../../Button";
import languages from "../../../constants/languages"
import {getYear, getMonth, getDate} from 'date-fns';


export const formFields = (actionButton, closeButton) => {
    return (
        [
            <Input className="input" label="ВАШЕ ИМЯ" type="text" key="1" name="firstName" defaultValue="Katya"/>,
            <Input className="input" label="ВАША ФАМИЛИЯ" type="text" key="2" name="lastName"/>,
            <DataSelect key="3" label="ДАТА РОЖДЕНИЯ" className="dataSelect"/>,
            <Input className="input" placeHolder="Ваша страна" label="СТРАНА" key="4" type="text" name="country"/>,
            <Input className="input" placeHolder="Ваш город" label="ГОРОД" key="5" type="text" name="city"/>,
            <TextArea className="textArea" label="ОБО МНЕ" key="6" name="about" rows="2"/>,
            <Input className="input" key="7" label="МОБИЛЬНЫЙ НОМЕР ТЕЛЕФОНА" placeHolder="Ваш номер телефона"
                   type="text" name="mobile"/>,
            <SelectMulti key="8" name="languages" massEl={languages} placeHolder="Выберите языки"
                         label="ВЫБРАТЬ ЯЗЫК"/>,
            <div key="12" className={styles.buttonBox}>
                <Button classList="form_button_submit form_width50 form_width50--left" children="СОХРАНИТЬ"
                        type="submit" key="12" action={actionButton}/>
                <Button classList="close-button form_width50 form_width50--right" children="ОТМЕНА" type="reset"
                        action={closeButton}/>
            </div>,
        ]);
};

export const InitialValues = () => {

    const dataUser = useSelector(userSelectors.getDataUser);

    // Получаем год рождения
    const year = getYear(new Date(dataUser.birthday));

    // Получаем месяц рождения
    const month = getMonth(new Date(dataUser.birthday));

    // Получаем день рождения
    const date = getDate(new Date(dataUser.birthday));

    return (
        {
            firstName: dataUser.firstName,
            lastName: dataUser.lastName,
            selectDate: date,
            selectYear: year,
            selectMonth: month,
            country: dataUser.country,
            city: dataUser.city,
            mobile: dataUser.mobile,
            languages: dataUser.languages,
            about: dataUser.about || '',
        })

};