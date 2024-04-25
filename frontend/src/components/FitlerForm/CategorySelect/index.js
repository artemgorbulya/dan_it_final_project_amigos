import React, { memo, useEffect } from 'react';
import Button from '../../Button';
import styles from "./CategorySelect.module.scss";
import {feedFilterOperations, feedFilterSelectors} from "../../../store/feedFilter";
import { useDispatch, useSelector } from 'react-redux';
import { useField } from 'formik';
import PropTypes from "prop-types";

const CategorySelect = ({name, category}) => {
	const [field, , helpers] = useField(name);
	const categories = useSelector(feedFilterSelectors.getCategories);
	const dispatch = useDispatch();
	const isActive = categories.includes(category._id);

	useEffect(() => {
		if (categories.length && !field.value.length) {
			helpers.setValue(categories);
		}
	});

	const clickHandler = () => {
		if (isActive) {
			helpers.setValue([...field.value.filter(id => id !== category._id)]);
			dispatch(feedFilterOperations.setCategories(categories.filter(id => id !== category._id)));
		} else {
			helpers.setValue([...field.value, category._id]);
			dispatch(feedFilterOperations.setCategories([...categories, category._id]));
		}
	}

	return (
		<Button classList={!isActive ? "category-btn" : "category-btn category-btn--selected"} action={clickHandler} >
			<img className={styles.categoryImg} src={category.icon} alt=""/>
			<span className={styles.text}>{category.title}</span>
		</Button>
	)
}

CategorySelect.propTypes = {
	name: PropTypes.string,
	category: PropTypes.object
}

CategorySelect.defaultProps = {
	name: "",
	category: {},
}

export default memo(CategorySelect);