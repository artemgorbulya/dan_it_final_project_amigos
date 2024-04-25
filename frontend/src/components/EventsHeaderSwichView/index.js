import React, {memo} from 'react';
import styles from "./EventsHeaderSwichView.module.scss";
import {NavLink} from "react-router-dom";

const EventsHeaderSwichView = () => {
	return (
		<div className={styles.wrapper}>
			<NavLink to='/home/events/list' className={styles.viewButtonEvents} activeClassName={styles.viewButtonEventsReversed} ><i className={`icon--view-list`} /></NavLink>
			<NavLink to='/home/events/map' className={styles.viewButtonMap} activeClassName={styles.viewButtonMapReversed}><i className={`icon--view-map`} /></NavLink>
		</div>
	)
};

export default memo(EventsHeaderSwichView);