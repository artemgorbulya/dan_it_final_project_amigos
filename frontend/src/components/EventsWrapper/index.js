import React, { memo } from 'react';
import styles from "./EventsWrapper.module.scss";

const EventsWrapper = ({children}) => {
	return (
		<div className={styles.wrapper}>
			{children}		
		</div>
	)
};

export default memo(EventsWrapper);