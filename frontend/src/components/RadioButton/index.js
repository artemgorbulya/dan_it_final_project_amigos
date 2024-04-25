import React, {memo, useEffect} from 'react';
import styles from "./RadioButton.module.scss"
import { useField } from 'formik';
import PropTypes from "prop-types";

const RadioButton = (props) => {
    const [field, meta, helpers] = useField(props.name);

        useEffect(() => {
            if (!!(props.setBlockError))
            {
                props.setBlockError(meta)
            }
        }, [meta]);

    const setOnTouched =()=>{
        helpers.setTouched(true);
    };

    return (
            <div className={styles[props.className]}  onClick={setOnTouched}>
                 <input  {...field}
                     id={props.id}
                     type="radio"
                     name={props.name}
                     value={props.value}/>
                 <label htmlFor={props.id}>
                     {props.imgButton}
                     <div className={styles.radio_btn__text}>{props.text}</div>
                 </label>
                {!!(props.setBlockError) || (meta.touched && meta.error) }
            </div>
    );
};


RadioButton.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    placeHolder:PropTypes.string,
    type:PropTypes.string,
    name:PropTypes.string,
    setMySexError: PropTypes.func,
    value: PropTypes.string,
    text: PropTypes.string,
    imgButton:PropTypes.object
};

RadioButton.defaultProps = {
    className:"formRadioBtn",
    label:" ",
    placeHolder:" ",
    type:"radio",
    name:" ",
    setMySexError: undefined,
    value: " ",
    text: " ",
    imgButton: undefined
};

export default memo(RadioButton);