import React, { memo, useCallback, useEffect } from 'react';
import Select from 'react-select'
import styles from "./LanguageSelect.module.scss"
import PropTypes from "prop-types";
import LANGUAGES from "../../../constants/languages";
import { useDispatch, useSelector } from 'react-redux';
import {feedFilterOperations, feedFilterSelectors} from "../../../store/feedFilter";
import { useField } from 'formik';

const orangeColor= '#FF652C';
const liteGreyColor= '#F8F9FA';
const lightBlueColor = '#14ACEF';
const selectColor = "#71838b";

const LanguageSelect = ({placeholder, name})=> {
    const languages = useSelector(feedFilterSelectors.getLanguages);
    const dispatch = useDispatch();

    const [field, , helpers] = useField(name);

    useEffect(() => {
        if (languages.length && !field.value.length) {
			helpers.setValue(languages);
		}
    });
    
    const handleChange = useCallback((values) => {
        const data = values?.map?.(item => item.value);
        helpers.setValue(data || []);
        dispatch(feedFilterOperations.setLanguages(data || []));
    }, [dispatch, helpers]);

    return (
        <div className={styles.wrapper}>
            <label className={styles.selectMulti__label}>
                <span className={styles.title}>Владение языками</span>
                <Select
                    options={LANGUAGES}
                    closeMenuOnSelect
                    menuPlacement="auto"
                    isMulti
                    isSearchable={false}
                    placeholder={placeholder}
                    onChange={handleChange}
                    value={languages.map(item => ({value: item, label: item}))}
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
                        }),
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
        </div>
    );
}

LanguageSelect.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
};

LanguageSelect.defaultProps = {
    name: "",
    placeholder: "",
};

export default memo(LanguageSelect);