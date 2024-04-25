import React, { memo } from 'react';
import HomePagesTitle from '../../components/HomePagesTitle';
import MyProfile from '../../components/MyProfile';
import EventsWrapper from '../../components/EventsWrapper';
import styles from './Profile.module.scss';
import {useSelector} from "react-redux";
import {userSelectors} from "../../store/user";
import {modalSelectors} from "../../store/modal";
import {eventSelectors} from "../../store/event";
import Modal from "../../components/Modal";
import ModalEventResponses from "../../components/ModalEventResponses";
import useResponseModalClose from "../../hooks/useResponseModalClose";
import {Link} from 'react-router-dom';
import {PLUS_ICON} from "../../assets/svg/svg";
import MyProfileEventCardWrapper from "../../components/MyProfileEventCardWrapper";

const Profile = () => {
    const isModalOpen = useSelector(modalSelectors.getModalOpen);
    const currentEventId = useSelector(eventSelectors.getCurrentEvent);
    const events = useSelector(userSelectors.getDataUser).events;
    const currentEvent = events.find(eventItem => eventItem._id === currentEventId);

    const closeModal = useResponseModalClose();

    const userEventList = events.map((eventItem, eventIndex) => {
        const {applicants, membersAllowed, title, dateStart, dateEnd, description, category, address, photo, peopleWanted} = eventItem;
        const countResponses = applicants.length + membersAllowed.length;
        const eventAddress = address.address ? address.address : eventItem.city.fullAddress;

       return <MyProfileEventCardWrapper
           key={eventIndex}
           id={eventItem._id}
           image={photo}
           title={title}
           address={eventAddress}
           dateStart={dateStart}
           dateEnd={dateEnd}
           text={description}
           category={category}
           countResponses={countResponses}
           peopleWanted={peopleWanted}
        />
    });

	return (
		<>
        <div className={styles.wrapper}>
            <HomePagesTitle title="Профиль"/>
            <MyProfile />
            <EventsWrapper>
                {isModalOpen && !!currentEvent  && <Modal title={'Смотреть отклики'} closeModal={closeModal}>
                    <ModalEventResponses currentEvent={currentEvent}/>
                </Modal> }
                {!events.length && <Link to='/home/create-event' className={styles.createEvent}>
                                          {PLUS_ICON} создать событие
                                   </Link>}
                {userEventList}
            </EventsWrapper>
        </div>
		</>
		
	)
};

export default memo(Profile);