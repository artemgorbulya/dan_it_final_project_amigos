import { useField } from 'formik';
import React, { memo } from 'react';
import styles from "./MessageInput.module.scss";
import PropTypes from "prop-types";

const MessageInput = ({name, placeholder, onChange, onBlur}) => {
	const [field] = useField(name);

	return (
		<input 
			className={styles.input} 
			type="text" 
			placeholder={placeholder} 
			autoComplete="off" 
			{...field}
			onChange={onChange}
			onBlur={onBlur}
		/>
	)
}

MessageInput.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func.isRequired,
}

MessageInput.defaultProps = {
	name: "",
	placeholder: "",
	onChange: () => {},
	onBlur: () => {},
}

export default memo(MessageInput);