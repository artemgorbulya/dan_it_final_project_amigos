import Input from "../../Input";
import styles from "../ChangeProfile.module.scss";
import Button from "../../Button";

export const formFields = (actionButton, closeButton) => {

    return (
        [
            <Input className="input" type="password" key="1" label="СТАРЫЙ ПАРОЛЬ" name="oldPassword"/>,
            <Input className="input" type="password" key="2" label="НОВЫЙ ПАРОЛЬ" name="newPassword"/>,
            <Input className="input" type="password" key="3" label="ПОВТОРИТЕ ПАРОЛЬ" name="confirmPassword"/>,
            <div key="4" className={styles.buttonBox}>
                <Button classList="form_button_submit form_width50 form_width50--left" children="СОХРАНИТЬ" type="submit" key="12" action={actionButton} />
                <Button classList="close-button form_width50 form_width50--right" children="ОТМЕНА" type="reset"  action={closeButton} />
            </div>,
        ]);
};


export const InitialValues =()=> {
    return(
        {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        })

};