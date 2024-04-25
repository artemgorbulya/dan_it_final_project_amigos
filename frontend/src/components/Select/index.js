import React, {memo, useEffect} from 'react';
import { useField } from 'formik';
import styles from "./Select.module.scss"
import PropTypes from "prop-types";
import {default as ReactSelect} from "react-select";

const orangeColor= '#FF652C';
const liteGreyColor= '#F8F9FA';
const lightBlueColor = '#14ACEF';
const selectColor = '#000000';

const Select = ({label, className, type, name, setBlockError, text, massEl}) => {
    const [, meta, helpers] = useField(name);

    useEffect(() => {
        if(!!(setBlockError))
        {
            setBlockError(meta, name)
        }
    }, [meta, meta.error, meta.touched, name, setBlockError]);

    const handleChange = (option) => {
        helpers.setValue(option.value);
    };
    const defaultSelectEl = massEl.find(massElItem =>massElItem.value === meta.value);

    return (
        <div className={styles.box} >
            <label>{label}
                <ReactSelect 
                    options={massEl}
                    closeMenuOnSelect={true}
                    isSearchable={false}
                    placeholder={text}
                    defaultValue={defaultSelectEl}
                    onChange={handleChange}
                    styles={{
                        control: (provided, state) => ({
                            ...provided,
                            background: liteGreyColor,
                            border: 0,
                            minHeight: "52px",
                            transition: "box-shadow ease .3s",
                            boxShadow: state.isFocused ? `inset 0 0 0 1px ${orangeColor}` : "none",
                        }),
                        dropdownIndicator: (provided, state) => ({
                            ...provided,
                            fontSize: "2px",
                            color: orangeColor,
                            "&:hover": {
                                color: orangeColor,
                            },
                            transition: "0.1s transform",
                            transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }),
                        indicatorSeparator: () => null,
                        placeholder: (provided) => ({
                            ...provided,
                            fontSize: "14px",
                            textIndent: "4px",
                            color: `${selectColor}`
                        }),
                        option: (provided) => ({
                            ...provided,
                            fontSize: "14px",
                        }),
                        singleValue: (provided) => ({
                            ...provided,
                            fontSize: "14px",
                            color: `${selectColor}`
                        })
                    }}
                    theme={theme => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            primary25: lightBlueColor,
                            primary50: lightBlueColor,
                        }
                    })}
                />
            </label>
            <span>{!!(setBlockError) || (meta.touched && meta.error) }</span>
        </div>
    )
};


Select.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    type:PropTypes.string,
    name:PropTypes.string,
    setBlockError: PropTypes.func,
    text: PropTypes.string,
    massEl: PropTypes.array,
};

Select.defaultProps = {
    className:"selectStyle",
    label:"",
    type:"text",
    name:" ",
    setBlockError: undefined,
    text: " ",
    massEl: undefined,
    min: undefined,
    max: undefined,
};
export default memo(Select);