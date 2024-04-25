import React, { memo } from 'react';
import styles from "./EventsTypeButton.module.scss";
import PropTypes from 'prop-types';

const EventsTypeButton = ({ type }) => {
	return (
		<div className={styles.content__type}>
			<div className={styles.content__typeButton}>
				<img className={styles.content__typeIcon} src={type?.icon} alt="" />
				{type?.title}
			</div>
		</div>
	)
};

EventsTypeButton.propTypes = {
	type: PropTypes.object.isRequired
};

export default memo(EventsTypeButton);