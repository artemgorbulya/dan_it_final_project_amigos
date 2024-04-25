import React, {memo, useState} from 'react';
import Select from "../Select";
import styles from "./DateSelect.module.scss"
import FormError from "../FormError";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {userSelectors} from "../../store/user";
import{dates, months, years} from "../../constants/date"



const DataSelect = (props) => {
    const [selectDateError, setSelectDateError] = useState('');
    const [selectMonthError, setSelectMonthError] = useState('');
    const [selectYearError, setSelectYearError] = useState('');
    const [touchedDateError, setTouchedDateError] = useState('');
    const [touchedMonthError, setTouchedMonthError] = useState('');
    const [touchedYearError, setTouchedYearError] = useState('');

    const clickSubmit = useSelector(userSelectors.getIsSubmitClick);


    const setDataError = (meta, name) => {
        switch (name) {
            case 'selectDate': {
                setSelectDateError(meta.error);
                setTouchedDateError(meta.touched);
                break;
            }
            case 'selectMonth': {
                setSelectMonthError(meta.error);
                setTouchedMonthError(meta.touched);
                break;
            }
            case 'selectYear': {
                setSelectYearError(meta.error);
                setTouchedYearError(meta.touched);
                break;
            }
            default:
                break;
        }
    };

    const error = (selectDateError || selectMonthError || selectYearError);
    const touched = (touchedDateError || touchedMonthError || touchedYearError);

    return (
        <div className={styles.box}>
            <label className={styles.dataSelect__label}>{props.label}
                <div className={styles[props.className]}>
                    <div className={styles.widthEl}>
                        <Select setBlockError={setDataError} className='selectStyle' name="selectDate" massEl={dates}
                                text="День"/>
                    </div>
                    <div className={styles.widthEl}>
                        <Select setBlockError={setDataError} className='selectStyle' name="selectMonth" massEl={months} text="Месяц"/>
                    </div>
                    <div className={styles.widthEl}>
                        <Select setBlockError={setDataError} className='selectStyle' name="selectYear" massEl={years()}
                                text="Год"/>
                    </div>
                </div>
            </label>
            {clickSubmit && error && touched && <FormError error={error}/>}
        </div>
    )
};

DataSelect.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
};

DataSelect.defaultProps = {
    className: 'dataSelect',
    label: '',
};

export default memo(DataSelect);
export {months};