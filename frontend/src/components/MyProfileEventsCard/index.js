import React, { memo } from 'react';
import styles from "./MyProfileEventsCard.module.scss";
import Button from '../Button';
import EventsTypeButton from '../EventsTypeButton';
import {useDispatch, useSelector} from "react-redux";
import {categoriesSelectors} from "../../store/categories";
import {modalOperations} from "../../store/modal";
import {eventOperations} from "../../store/event";
import useResponseModalClose from "../../hooks/useResponseModalClose";
import {HUMAN_ICON, DELETE_ICON, EYE_ICON} from "../../assets/svg/svg";
import {parsePeopleWanted} from "../../utils/parsePeopleWanted";
import DropdownList from "../DropdownList";
import {format, isToday, isTomorrow} from "date-fns";
import PropTypes from "prop-types";

const MyProfileEventsCard =({id, image, title, address, dateStart, dateEnd, text, category, peopleWanted, className, countResponses, modalCard}) => {
	const categoryObj = useSelector(categoriesSelectors.getCategories).find(elem => elem._id === category);
	const dispatch = useDispatch();
	const closeModal = useResponseModalClose();

	const showResponses = (eventId) => {
		dispatch(modalOperations.toggleModalOperation(true));
		dispatch(eventOperations.getCurrentEventOperation(eventId));
	};

	const getCurrentEvent = (eventId) => {
		dispatch(eventOperations.getCurrentEventOperation(eventId));
		dispatch(modalOperations.toggleAlertOperation(true));
	};

	let responseButton;
	   if (!modalCard){
	   	   responseButton = countResponses > 0
			   ?
			   <Button classList='btn btn--primary btn--event' action={() => showResponses(id)}>
				   <div className={styles.button__content}>
					   <div className={styles.button__text}>
						   {EYE_ICON} смотреть отклики ({countResponses})
					   </div>
				   </div>
			   </Button>
			   :
			   <Button classList='btn btn--event'>
				   <div className={styles.button__content}>
					   <div className={styles.button__text}>откликов нет</div>
				   </div>
			   </Button>
	   } else {
	   	   responseButton = <Button classList='btn btn--primary btn--event' action={closeModal}>
			   <div className={styles.button__content}>
				   <div className={styles.button__text}>Вернуться к откликам</div>
			   </div>
		   </Button>
	   }

	return (
		<div key={id} className={`${styles.wrapper} ${styles[className]}`}>
			<div className={styles.photo} style={{backgroundImage: `url(${image})`}}>
				<div className={styles[`drop-menu`]}>
					<DropdownList profileDrop='true'
						          options={[<div className={styles[`delete-event`]} onClick={() => getCurrentEvent(id)}>
									           {DELETE_ICON} Удалить событие
						                   </div>]}
					/>
				</div>
			</div>
			<div className={styles.button}>
				 {responseButton}
			</div>
			<div className={styles.content}>
				<div className={styles.content__title}>{title}</div>
				<div className={styles.content__wrapper}>
					<div className={`${styles.content__placeTime} ${styles.content__blue}`}>
						<i className={`icon--map-marker ${styles.content__icon}`}/>{address}
					</div>
					<div className={`${styles.content__placeTime} ${styles.content__orange}`}>
						<i className={`icon--calendar ${styles.content__icon}`}/>
						{
							dateStart && dateEnd ? `${format(new Date(dateStart), "dd.MM.yy")} - ${format(new Date(dateEnd), "dd.MM.yy")}` :
							dateStart && !dateEnd ? 
								isTomorrow(dateStart) ? "Завтра" :
								isToday(dateStart) ? "Сегодня" : `${format(new Date(dateStart), "dd.MM.yy")}` : `В любое время`
						}
					</div>
					<div className={`${styles.content__placeTime} ${styles.content__darkBlue}`}>
						<span className={styles.humanIcon}>{HUMAN_ICON}</span>
						<span className={styles.peopleWantedText}>{parsePeopleWanted(peopleWanted)}</span>
					</div>
				</div>
				<div className={styles.content__text}>{text}</div>
				<EventsTypeButton type={categoryObj}/>
			</div>
		</div>
	)
};

MyProfileEventsCard.propTypes = {
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	address: PropTypes.string,
	dateStart: PropTypes.oneOfType([
													PropTypes.number,
													PropTypes.object]),
	dateEnd: PropTypes.oneOfType([
												PropTypes.number,
												PropTypes.object]),
	text: PropTypes.string,
	peopleWanted: PropTypes.string.isRequired,
	category: PropTypes.oneOfType([
													PropTypes.number,
													PropTypes.object]).isRequired,
	className: PropTypes.string,
	modalCard: PropTypes.oneOfType([
													PropTypes.string,
													PropTypes.bool]),
	countResponses: PropTypes.number,
};

MyProfileEventsCard.defaultProps = {
	address: '',
	dateStart: null,
	dateEnd: null,
	text: '',
	className: '',
	modalCard: false,
	countResponses: 0
};

export default memo(MyProfileEventsCard);
