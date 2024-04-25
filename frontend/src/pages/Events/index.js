import React, { memo } from 'react';
import HomePagesTitle from '../../components/HomePagesTitle';
import EventsFilterPanel from '../../components/EventsFilterPanel';
import EventsHeaderSwichView from '../../components/EventsHeaderSwichView';
import EventRoutes from '../../routes/EventRoutes';
import {Redirect, useLocation} from "react-router-dom";
import styles from './Events.module.scss';

const Events = () => {

	const location = useLocation();

	return (
		<div className={styles.wrapper}>

			{(location.pathname === '/home/events' || location.pathname === '/home/events/') && <Redirect
				to='/home/events/list'/>}
			<HomePagesTitle title="События">
				<EventsHeaderSwichView/>
			</HomePagesTitle>
			<EventsFilterPanel/>
			<EventRoutes/>
		</div>
	)
};

export default memo(Events);