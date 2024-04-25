import React, { memo } from 'react';
import styles from "./Input.module.scss"
import {useField} from 'formik';
import FormError from "../FormError";
import PropTypes from 'prop-types';
import {useSelector} from "react-redux";
import {userSelectors} from "../../store/user";


const Input = (props) => {
    const {className, type, placeHolder, name} = props;
    const [field, meta] = useField(props.name);
    const clickSubmit=useSelector(userSelectors.getIsSubmitClick);

    return (
        <div className={styles.box}>
            <label className={styles.input__label}>{props.label}
                <input {...field}
                       className={styles[className]}
                       type={type}
                       placeholder={placeHolder}
                       name={name}
                />
            </label>
            {clickSubmit && meta.touched && meta.error && <FormError error={meta.error}/>}
        </div>
    );
};

Input.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    placeHolder: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
};

Input.defaultProps = {
    className: "input",
    label: " ",
    placeHolder: " ",
    type: "text",
    name: " ",

};
export default memo(Input);