import React, { memo, useEffect } from 'react';
import styles from "./Checkbox.module.scss";
import PropTypes from "prop-types";
import {feedFilterSelectors, feedFilterOperations} from "../../../store/feedFilter";
import { useDispatch, useSelector } from 'react-redux';
import { useField } from 'formik';

const Checkbox = ({name, text, value}) => {
	const peopleWanted = useSelector(feedFilterSelectors.getPeopleWanted);
	const dispatch = useDispatch();

	const [field, , helpers] = useField(name);

	const isChecked = peopleWanted.includes(value);

	useEffect(() => {
		if (isChecked && !field.value.length) {
			helpers.setValue([...field.value, value]);
		}
	})

	const handleChange = () => {
		if (isChecked) {
			helpers.setValue(field.value.filter(item => item !== value));
			dispatch(feedFilterOperations.setPeopleWanted(peopleWanted.filter(item => item !== value)));
		} else {
			helpers.setValue([...field.value, value]);
			dispatch(feedFilterOperations.setPeopleWanted([...peopleWanted, value]));
		}
	}

	return (
		<label className={styles.label}>
			<div className={styles.checkboxWrapper}>
				<input 
					className={isChecked ? styles.checkboxInputActive : styles.checkboxInput} 
					type="checkbox"
					{...field}
					onChange={handleChange}
				/>
				<span className={styles.checkboxText}>{text}</span>
			</div>
		</label>
	);
}

Checkbox.propTypes = {
	text: PropTypes.string,
	value: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
}

Checkbox.defaultProps = {
	text: "",
	value: "",
	name: "",
}

export default memo(Checkbox);