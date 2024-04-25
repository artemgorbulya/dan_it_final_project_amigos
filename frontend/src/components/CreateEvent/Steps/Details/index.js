import React, { memo } from "react";
import { Field, ErrorMessage } from "formik";
import Select from "../../../Select";
import PropTypes from "prop-types";
import styles from "./Details.module.scss";

const Details = ({ peopleWantedField, titleField, descriptionField }) => (
    <>
        <h3 className={styles.subtitle}>Введите описание события</h3>
        <div className={styles.selectSex}>
            <Select
                label={peopleWantedField.label}
                name={peopleWantedField.name}
                text={peopleWantedField.placeholder}
                massEl={peopleWantedField.options}
            />
            <ErrorMessage name={peopleWantedField.name} render={msg => <span className={styles.error}>{`* ${msg}`}</span>} />
        </div>
        <div className={styles.title}>
            <label className={styles['form-row']}>
                <span className={styles['form-row__label']}>{titleField.label}</span>
                <Field component='textarea' name={titleField.name} placeholder={titleField.placeholder} onBlur={()=> {}}/>
            </label>
            <ErrorMessage name={titleField.name} render={msg => <span className={styles.error}>{`* ${msg}`}</span>} />
        </div>
        <div className={styles.desc}>
            <label className={styles['form-row']}>
                <span className={styles['form-row__label']}>{descriptionField.label}</span>
                <Field component='textarea' name={descriptionField.name} placeholder={descriptionField.placeholder} onBlur={()=> {}}/>
            </label>
            <ErrorMessage name={descriptionField.name} render={msg => <span className={styles.error}>{`* ${msg}`}</span>} />
        </div>
    </>
);

Details.propTypes = {
    peopleWantedField: PropTypes.object,
    titleField: PropTypes.object,
    descriptionField: PropTypes.object,
};

Details.defaultProps = {
    peopleWantedField: {
        name: 'peopleWanted',
        label: 'Кого вы ищете?',
        options: [],
        placeholder: 'Укажите кого вы ищете'
    },
    titleField: {
        name: 'title',
        label: 'Название (2-3 слова)',
        placeholder: 'Название события (2-3 слова)'
    },
    descriptionField: {
        name: 'description',
        label: 'Описание',
        placeholder: 'Добавьте описание события'
    }
}

export default memo(Details);