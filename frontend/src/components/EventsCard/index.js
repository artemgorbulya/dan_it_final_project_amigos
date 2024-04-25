import React, { memo } from 'react';
import styles from "./EventsCard.module.scss";
import Button from '../Button';
import EventsTypeButton from '../EventsTypeButton';
import {format, isToday, isTomorrow} from "date-fns";
import {ru} from "date-fns/locale"
import DropdownList from "../DropdownList";
import useResponseModalClose from "../../hooks/useResponseModalClose";
import {parsePeopleWanted} from "../../utils/parsePeopleWanted";
import {BACK_ARROW, HUMAN_ICON} from "../../assets/svg/svg";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {eventOperations} from "../../store/event";
import {modalOperations} from "../../store/modal";
import PropTypes from "prop-types";

const EventsCard = ({id, userId, name, age, createDate, image, userpick, title, address, dateStart, dateEnd, text, peopleWanted, category, className, modalCard, isSubscribed, buttonAction}) => {
	const russianDate = format(new Date(createDate), "LLLL d, HH:mm", {locale: ru});
	const dispatch = useDispatch();
	const closeModal = useResponseModalClose();

	const getCurrentEvent = (eventId) => {
		dispatch(eventOperations.getCurrentEventOperation(eventId));
		dispatch(modalOperations.toggleAlertOperation(true));
	};

	let actionButton;

	if (!modalCard) {
		actionButton = isSubscribed
			?
			<Button classList='btn  btn--event btn--disabled'>
				<div className={styles.button__content}>
					<i className={`icon--check`}/>
					<div className={styles.button__text}>запрос отправлен</div>
				</div>
			</Button>
			:
			<Button classList='btn btn--primary btn--event' action={buttonAction}>
				<div className={styles.button__content}>
					<i className={`icon--clap`}/>
					<div className={styles.button__text}>пойти вместе</div>
				</div>
			</Button>;
	} else {
		actionButton = <Button classList='btn btn--primary btn--event' action={closeModal}>
			<div className={styles.button__content}>
				<div className={styles.button__text}>Вернуться к откликам</div>
			</div>
		</Button>
	}

	return (
		<div key={id} className={`${styles[className]} ${styles.wrapper}`}>
			<div className={styles.header}>
				<div className={styles.header__userBlock}>
					{userId ? 
						<Link to={`/home/profile/${userId}`} onClick={closeModal}>
							<div className={styles.header__userPick} style={{backgroundImage: `url(${userpick})`}}/>
						</Link> : 
						<div className={styles.header__userPick} style={{backgroundImage: `url(${userpick})`}}/>
					}

					<div>
						{userId ? 
							<Link to={`/home/profile/${userId}`} onClick={closeModal}>
								<div className={styles.header__name}>{name}, {age}</div>
							</Link> : 
							<div className={styles.header__name}>{name}, {age}</div>
						}
						<div className={styles.header__time}>{russianDate}</div>
					</div>
				</div>
				<div className={styles.header__menuBlock}>
					{(!!modalCard || isSubscribed) && 
						<DropdownList options={[
							<div className={styles.dropOption} onClick={() => getCurrentEvent(id)}>
								{BACK_ARROW} Отменить запрос
							</div>
						]}/>
					}
				</div>
			</div>	
			<div className={styles.photo} style={{backgroundImage: `url(${image})`}}>
			</div>
			<div className={styles.button}>
				{actionButton}
			</div>
			<div className={styles.content}>
				<div className={styles.content__title}>{title}</div>
				<div className={styles.content__wrapper}>
					<div className={`${styles.content__placeTime} ${styles.content__blue}`}>
						<i className={`icon--map-marker ${styles.content__icon}`}/>
						{address}
					</div>
					<div className={`${styles.content__placeTime} ${styles.content__orange}`}>
						<i className={`icon--calendar ${styles.content__icon}`}/>
						{
							dateStart && dateEnd ? `${format(new Date(dateStart), "dd.MM.yy")} - ${format(new Date(dateEnd), "dd.MM.yy")}` :
							dateStart && !dateEnd ? 
								isTomorrow(dateStart) ? "Завтра" :
								isToday(dateStart) ? "Сегодня" :`${format(new Date(dateStart), "dd.MM.yy")}` : `В любое время`
						}
					</div>
					<div className={`${styles.content__placeTime} ${styles.content__darkBlue}`}>
						<span className={styles.humanIcon}>{HUMAN_ICON}</span>
						<span className={styles.peopleWantedText}>{parsePeopleWanted(peopleWanted)}</span>
					</div>
				</div>
				<div className={styles.content__text}>{text}</div>

				<EventsTypeButton type={category}/>
					
			</div>
		</div>
	)
};

EventsCard.propTypes = {
	name: PropTypes.string.isRequired,
	age: PropTypes.number.isRequired,
	createDate: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	userpick: PropTypes.string.isRequired,
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
	isSubscribed: PropTypes.oneOfType([
		                        PropTypes.string,
		                        PropTypes.object,
		                        PropTypes.bool]),
	buttonAction: PropTypes.func,
};

EventsCard.defaultProps = {
	address: '',
	dateStart: null,
	dateEnd: null,
	text: '',
	className: '',
	modalCard: false,
	isSubscribed: false,
	buttonAction: undefined,
};

export default memo(EventsCard);