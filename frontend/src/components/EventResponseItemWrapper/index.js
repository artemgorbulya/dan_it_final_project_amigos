import React, { memo } from 'react';
import {useSelector} from "react-redux";
import {modalSelectors} from "../../store/modal";
import Modal from "../Modal";
import EventResponse from "../EventResponse";
import {eventSelectors} from "../../store/event";
import {userSelectors} from "../../store/user";
import {categoriesSelectors} from "../../store/categories";
import {getAge} from "../../utils/mathHelpels";
import useResponseModalClose from "../../hooks/useResponseModalClose";
import EventCardWrapper from "../EventCardWrapper";
import MyProfileEventCardWrapper from "../MyProfileEventCardWrapper";
import PropTypes from 'prop-types';

const EventResponseItemWrapper = ({eventId, userId, name, age, userPick, eventTitle, responseType, responseReaction, actions, dropAction}) => {

    const modalOpen = useSelector(modalSelectors.getModalOpen);
    const currentEventId = useSelector(eventSelectors.getCurrentEvent);
    const currentUserId = useSelector(eventSelectors.getCurrentUser);
    const events = useSelector(userSelectors.getDataUser).events;
    const sentEvents = useSelector(userSelectors.getDataUser).sentEvents;
    const appliedEvents = useSelector(userSelectors.getDataUser).appliedEvents;
    const categoryList = useSelector(categoriesSelectors.getCategories);
    const closeModal = useResponseModalClose();

    let showEvent;

    if (modalOpen){
        const currentEvent = events.find(eventItem => eventItem._id === currentEventId);
        if (currentEvent && currentEventId === eventId && currentUserId === userId) {
            const {photo, title, description, address, category, dateStart, dateEnd, peopleWanted} = currentEvent;
            const eventAddress = address.address ? address.address : currentEvent.city.fullAddress;

            showEvent = <Modal title="Cобытие" closeModal={closeModal}>
                <MyProfileEventCardWrapper
                    id={eventId}
                    className = 'wrapper--modal'
                    modalCard='true'
                    image={photo}
                    title={title}
                    address={eventAddress}
                    dateStart={dateStart}
                    dateEnd={dateEnd}
                    text={description}
                    category={category}
                    peopleWanted={peopleWanted}
                />
            </Modal>
        } else {
            const requestEvent = sentEvents
                .find(eventItem => eventItem._id === currentEventId)
                || appliedEvents.find(eventItem => eventItem._id === currentEventId);
            if (requestEvent && currentEventId === eventId){
              const {photo, title, description, address, category, dateStart, dateEnd, author, updateDate, peopleWanted} = requestEvent;
              const eventAddress = address.address ? address.address : requestEvent.city.fullAddress;
              const {firstName, birthday, photos} = author;
              const age = getAge(birthday);
              const categoryObj = categoryList.find(elem => elem._id === category);

              showEvent = <Modal title="Cобытие" closeModal={closeModal}>
                <EventCardWrapper
                  key={requestEvent._id}
                  id={requestEvent._id}
                  userId={author._id}
                  className = 'wrapper--modal'
                  modalCard='true'
                  name={firstName}
                  age={age}
                  createDate={updateDate}
                  image={photo}
                  userpick={photos[0].photoURL}
                  title={title}
                  dateStart={dateStart}
                  dateEnd={dateEnd}
                  address={eventAddress}
                  text={description}
                  category={categoryObj}
                  peopleWanted={peopleWanted}
                />
              </Modal>
            }
        }
    }

    return (
        <>
            {showEvent}
            <EventResponse key={userId}
                           eventId={eventId}
                           userId={userId}
                           name={name}
                           age={age}
                           userPick={userPick}
                           title={eventTitle}
                           responseType={responseType}
                           responseReaction={responseReaction}
                           actions={actions}
                           dropAction={dropAction}
            />
        </>
    )
};

EventResponseItemWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  userPick: PropTypes.string.isRequired,
  eventTitle: PropTypes.string,
  responseType: PropTypes.string.isRequired,
  responseReaction: PropTypes.string,
  actions: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string]),
  dropAction: PropTypes.func,
};

EventResponseItemWrapper.defaultProps = {
  responseReaction: '',
  actions: '',
  eventTitle: '',
};

export default memo(EventResponseItemWrapper);