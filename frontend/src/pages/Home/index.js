import React, { memo } from 'react';
import styles from "./Home.module.scss";
import HomeRoutes from '../../routes/HomeRoutes';
import {NavLink, Redirect, useLocation, useHistory} from 'react-router-dom';
import "../../scss/base/base.scss";
import Header from "../../components/Header";
import {useDispatch, useSelector} from 'react-redux';
import { messagesSelectors } from '../../store/messages';
import { userSelectors } from '../../store/user';
import {modalOperations, modalSelectors} from "../../store/modal";

const Home = () => {
	const chatrooms = useSelector(messagesSelectors.getChatrooms);
	const user = useSelector(userSelectors.getDataUser);
	const location = useLocation();
	const rootLocation = !location || location.pathname === '/' || location.pathname === '/home' || location
																																																.pathname === '/home/';

  const dispatch = useDispatch();

	window.onpopstate = function(event) {
			dispatch(modalOperations.toggleModalOperation(false));
			dispatch(modalOperations.toggleAlertOperation(false));
	};


	return (
		<div className={styles.bg}>
			<Header/>
			{rootLocation  &&  <Redirect to='/home/events/list'/>}
			<div className="container">
				<div className={styles.homeLayout}>
					<div className={styles.mainMenu}>
						<NavLink activeClassName={styles.mainMenu__selected} className={styles.mainMenu__link}
								exact to="/home/profile">
							<i className={`icon--profile-circle ${styles.mainMenu__icon}`}/>
							<span className={styles.mainMenu__info}>Профиль</span>
						</NavLink>
						<NavLink activeClassName={styles.mainMenu__selected} className={styles.mainMenu__link}
								 to="/home/events">
							<i className={`icon--event-circle ${styles.mainMenu__icon}`}/>
							<span className={styles.mainMenu__info}>Все события</span>
						</NavLink>
						<NavLink activeClassName={styles.mainMenu__selected} className={styles.mainMenu__link}
								 to="/home/responses">
							<i className={`icon--bell-circle ${styles.mainMenu__icon}`}/>
							<span className={styles.mainMenu__info}>Отклики</span>
						</NavLink>
						<NavLink activeClassName={styles.mainMenu__selected} className={styles.mainMenu__link}
								 to="/home/messages/inbox">
							<i className={`icon--message-circle ${styles.mainMenu__icon}`}/>
							{!!chatrooms?.filter?.(chatroom => chatroom.messages.find(msg => !msg.readBy.includes(user._id))).length && <div className={styles.orangeMark} />}
							<span className={styles.mainMenu__info}>Сообщения</span>
						</NavLink>
						<NavLink activeClassName={styles.mainMenu__selected} className={styles.mainMenu__link}
								 to="/home/create-event">
							<div className={styles.mainMenu__addEventIconBg}>
								<i className={`icon--add-circle`}/>
							</div>
							<span className={styles.mainMenu__info}>Создать событие</span>
						</NavLink>
					</div>
					<div className={styles.pageRoutes}>
						<HomeRoutes/>
					</div>
				</div>
			</div>
		</div>
	)
};

export default memo(Home);