import React, { memo } from 'react';
import PropTypes from "prop-types";
import styles from "./FilterWrapper.module.scss";
import { useDispatch } from 'react-redux';
import { feedListOperations } from '../../../store/feedList';

const FilterWrapper = ({title, children, action}) => {
	const dispatch = useDispatch();

	const handleClick = () => {
		if (Array.isArray(action)) {
			action.forEach(a => dispatch(a));
		} else {
			dispatch(action);
		}
		dispatch(feedListOperations.getFeed(true));
	}

	return (
		<div className={styles.wrapper}>
			<span className={styles.title}>{title}</span>
			{children}
			<span className={styles.closeBtn} onClick={handleClick}><i className="icon--cancel"/></span>
		</div>
	)
}

FilterWrapper.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]).isRequired,
	action: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.func), PropTypes.func]),
}

FilterWrapper.defaultProps = {
	title: "",
	children: "",
	action: () => {},
}

export default memo(FilterWrapper);