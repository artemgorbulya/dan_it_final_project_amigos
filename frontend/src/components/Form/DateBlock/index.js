import React, {memo} from "react";
import {ErrorMessage, Field} from "formik";
import {endOfDay, startOfTomorrow} from "date-fns";
import PropTypes from "prop-types";
import DatePickerCustom from "./DatePicker";
import Button from "../../Button";
import styles from "./DateBlock.module.scss";

const dateBtns = [
    {key: 'any', text: "В любой день"},
    {key: 'today', text: "Сегодня"},
    {key: 'tomorrow', text: "Завтра"},
    {key: 'date', text: "Выбрать дату"},
];

const DateBlock = ({label, fieldName}) => {
    const dates = {
        any: null,
        today: endOfDay(new Date()),
        tomorrow: endOfDay(startOfTomorrow())
    };

    return (
        <div className={styles.date}>
            <div className={styles['form-row']} role='group' aria-labelledby='date-radio-group'>
                <span className={styles['form-row__label']}>{label}</span>
                {dateBtns.map(({key, text}) => (
                    <label key={key}>
                        <Field
                            name={fieldName}
                            component={({field, form}) => {
                                const {setFieldValue} = form;
                                const {name, value} = field;

                                if (key !== 'date') {
                                    return (
                                        <Button
                                            classList={key === value.key ? 'btn btn--primary' : 'btn btn--stroke-orange'}
                                            action={() => {
                                                setFieldValue(name, {
                                                    key: key,
                                                    value: dates[key]
                                                });
                                            }}
                                        >
                                            {key === value.key && <i className='icon--check'/>}
                                            {text}
                                        </Button>
                                    )
                                } else {
                                    return (
                                        <DatePickerCustom
                                            field={name}
                                            values={value.value}
                                            setValue={setFieldValue}
                                            btnKey={key}
                                            activeBtn={value.key}
                                            text={text}
                                        />
                                    )
                                }
                            }}
                        />
                    </label>
                ))}
            </div>
            <ErrorMessage name={fieldName} render={msg => <span className={styles.error}>{`* ${msg}`}</span>} />
        </div>
    )
};

DateBlock.propTypes = {
    label: PropTypes.string.isRequired,
    fieldName: PropTypes.string.isRequired
}

DateBlock.defaultProps = {
    label: 'Choose a date',
    fieldName: 'date'
}

export default memo(DateBlock);