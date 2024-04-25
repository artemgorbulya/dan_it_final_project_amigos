import React, { memo } from 'react';
import {useField} from "formik";
import styles from "./TextArea.module.scss";
import FormError from "../FormError";
import {useSelector} from "react-redux";
import {userSelectors} from "../../store/user";

const TextArea = (props) => {
    const {className, placeHolder, name, rows, label} = props;
    const [field, meta] = useField(props.name);
    const clickSubmit=useSelector(userSelectors.getIsSubmitClick);
    return (
        <div className={styles.box}>
            <label className={styles.textArea__label}> {label}
                <textarea
                    {...field}
                    className={styles[className]}
                    placeholder={placeHolder}
                    name={name}
                    rows={rows}
                >

                </textarea>
                {clickSubmit && meta.touched && meta.error && <FormError error={meta.error}/>}
            </label>
        </div>
    );
};

export default memo(TextArea);