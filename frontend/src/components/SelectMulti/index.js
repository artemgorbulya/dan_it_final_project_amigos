import React, { memo } from 'react';
import { useField} from 'formik';
import Select from 'react-select'
import styles from "./selectMulti.module.scss"
import "./../../scss/base/_variables.scss"
import FormError from "../FormError";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {userSelectors} from "../../store/user";

const orangeColor= '#FF652C';
const liteGreyColor= '#F8F9FA';
const lightBlueColor = '#14ACEF';
const selectColor = "#71838b";

const SelectMulti = ({name, massEl, placeHolder, label})=> {
    const [field,meta,helpers] = useField(name);
    const clickSubmit=useSelector(userSelectors.getIsSubmitClick);
    const selectInFormik =(massEl)=> {
        if (!massEl || massEl.length===0){
            helpers.setValue([]);
        }
        else{
            let newMass = massEl.map((item) =>
                item.value
            );
            helpers.setValue(newMass);
        }
     };

    let massDefaultEl = [];
    meta.value.forEach(item =>{
        const defaultSelectEl = massEl.find(massElItem =>massElItem.value === item);
        massDefaultEl.push(defaultSelectEl);
    });

    return (
        <div className={styles.box}>
            <label className={styles.selectMulti__label} {...field}> {label}
                <Select
                    options={massEl}
                    className={styles.selectMulti}
                    closeMenuOnSelect={true}
                    isMulti
                    plaseholder={placeHolder}
                    isSearchable={false}
                    placeholder='Выберите язык'
                    onChange={selectInFormik}
                    defaultValue={massDefaultEl}
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
                        }),
                        option: (provided) => ({
                            ...provided,
                            fontSize: "14px",
                        }),
                        multiValue: (provided) => ({
                            ...provided,
                            width: "auto",
                            background: selectColor,
                            borderRadius: "4px",
                        }),
                        multiValueLabel: (provided) => ({
                            ...provided,
                            fontSize: "13px",
                            color: "white",
                        }),
                        multiValueRemove: (provided) => ({
                            ...provided,
                            color: "white",
                            "&:hover": {
                                background: "white",
                                color: selectColor,
                            }
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
            {clickSubmit && meta.touched && meta.error && <FormError error={meta.error}/>}
        </div>
    );
};

SelectMulti.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    name:PropTypes.string,
    massEl: PropTypes.array,
};

SelectMulti.defaultProps = {
    className:"selectMulti",
    label:"",
    name:" ",
    massEl: [],
};



export default memo(SelectMulti);