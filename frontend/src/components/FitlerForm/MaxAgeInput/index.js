import React, { memo, useEffect } from 'react';
import styles from "./MaxAgeInput.module.scss"
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { feedFilterOperations, feedFilterSelectors } from '../../../store/feedFilter';
import { useField } from 'formik';

const MaxAgeInput = ({name}) => {
	const maxAge = useSelector(feedFilterSelectors.getMaxAge);
	const dispatch = useDispatch();

	const [field, meta, helpers] = useField(name);

	useEffect(() => {
		if (maxAge && !field.value) {
			helpers.setValue(maxAge);
		}
	})

	const handleChange = (e) => {
		field.onChange(e);
		dispatch(feedFilterOperations.setMaxAge(Number(e.target.value)));
	}

	return (
		<div className={styles.wrapper}>
			<input 
				className={styles.input}
				type="number"
				{...field}
				onChange={handleChange}
			/>
			<span className={styles.text}>до</span>
			{meta.touched && 
				meta.error && 
				<span className={styles.errorMessage}>{meta.error}</span>}
		</div>
	);
};

MaxAgeInput.propTypes = {
	name: PropTypes.string,
}

MaxAgeInput.defaultProps = {
	name: "",
}

export default memo(MaxAgeInput);