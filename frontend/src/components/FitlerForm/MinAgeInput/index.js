import React, { memo, useEffect } from 'react';
import styles from "./MinAgeInput.module.scss"
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { feedFilterOperations, feedFilterSelectors } from '../../../store/feedFilter';
import { useField } from 'formik';

const MinAgeInput = ({name}) => {
	const minAge = useSelector(feedFilterSelectors.getMinAge);
	const dispatch = useDispatch();

	const [field, meta, helpers] = useField(name);

	useEffect(() => {
		if (minAge && !field.value) {
			helpers.setValue(minAge);
		}
	})

	const handleChange = (e) => {
		field.onChange(e);
		dispatch(feedFilterOperations.setMinAge(Number(e.target.value)));
	}

	return (
		<div className={styles.wrapper}>
			<input 
				className={styles.input}
				type="number"
				{...field}
				onChange={handleChange}
			/>
			<span className={styles.text}>от</span>
			{meta.touched && 
				meta.error && 
				<span className={styles.errorMessage}>{meta.error}</span>}
		</div>
	);
};

MinAgeInput.propTypes = {
	name: PropTypes.string,
}

MinAgeInput.defaultProps = {
	name: "",
}

export default memo(MinAgeInput);