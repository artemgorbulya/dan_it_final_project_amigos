import React, { memo } from "react";
import { Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import styles from "./Category.module.scss";
import { useSelector } from "react-redux";
import { categoriesSelectors } from "../../../../store/categories";

const Category = ({ categoryField, value }) => {
    const categories = useSelector(categoriesSelectors.getCategories);

    return (
        <>
            <h3 className={styles.subtitle}>{categoryField.label}</h3>
            <div role='group' aria-labelledby='category-group' className={styles.categories}>
                {categories.map(({ _id: id, background, title, icon }) => (
                    <label className={styles.category} style={{backgroundImage: `url(${background})`}} key={id}>
                        <div>
                            {id === +value && (
                                <div className={styles.checkMark}>
                                    <i className='icon--check' />
                                </div>
                            )}
                            <h4 className={styles.categoryTitle}>{title}</h4>
                        </div>
                        <div className={styles.whiteCircle}>
                            <img src={icon} alt=''/>
                        </div>

                        <Field hidden style={{position: 'absolute'}} type='radio' name={categoryField.name} value={id} />
                    </label>
                ))}
                <ErrorMessage name={categoryField.name} render={msg => <span className={styles.error}>{`* ${msg}`}</span>} />
            </div>
        </>
    );
};

Category.propTypes = {
    categoryField: PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.string
    }),
    value: PropTypes.string
}

Category.defaultValue = {
    categoryField: {
        name: 'category'
    }
}

export default memo(Category);

