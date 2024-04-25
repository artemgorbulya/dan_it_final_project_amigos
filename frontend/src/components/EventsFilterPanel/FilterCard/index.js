import React, { memo } from 'react';
import PropTypes from "prop-types";
import styles from "./FilterCard.module.scss";
import { useDispatch } from 'react-redux';
import { feedListOperations } from '../../../store/feedList';

const FilterCard = ({title, action}) => {
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(action);
		dispatch(feedListOperations.getFeed(true));
	}

	return (
		<div className={styles.card}>
			<span className={styles.title}>{title}</span>
			<span className={styles.closeBtn} onClick={handleClick}><i className="icon--cancel"/></span>
		</div>
	)
}

FilterCard.propTypes = {
	title: PropTypes.string,
	action: PropTypes.func.isRequired,
}

FilterCard.defaultProps = {
	title: "",
	action: () => {},
}

export default memo(FilterCard);