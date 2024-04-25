import React, { memo } from 'react';
import HomePagesTitle from '../../components/HomePagesTitle';
import ResponseRoutes from "../../routes/ResponseRoutes";
import styles from './Responses.module.scss';
import {NavLink, Redirect, useLocation} from "react-router-dom";


const Responses = () => {
	const location = useLocation();

	return (
		<>
			<HomePagesTitle title="Отклики"/>
			{(location.pathname === '/home/responses' || location.pathname === '/home/responses/') && <Redirect
				to='/home/responses/myresponses'/>}

			<div className={styles.link__wrapper}>
				<NavLink activeClassName={styles['response__link--active']} className={styles.response__link}
						 to='/home/responses/myresponses'>
					Полученные
				</NavLink>
				<NavLink activeClassName={styles['response__link--active']} className={styles.response__link}
						 to='/home/responses/myrequests'>Отправленные</NavLink>
			</div>
			<div className={styles.response__wrapper}>
				<ResponseRoutes/>
			</div>
		</>
	)
};

export default memo(Responses);