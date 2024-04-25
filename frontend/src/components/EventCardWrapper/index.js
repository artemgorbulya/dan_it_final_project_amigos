import React, { memo } from 'react';
import EventsCard from "../EventsCard";
import axios from "axios";
import {userOperations} from "../../store/user";
import {useDispatch, useSelector} from "react-redux";
import AlertElement from "../AlertElement";
import {eventSelectors} from "../../store/event";
import {modalSelectors} from "../../store/modal";
import PropTypes from 'prop-types';

const EventCardWrapper = React.forwardRef(({id, userId, name, age, createDate, image, userpick, title, address, dateStart, dateEnd, text, peopleWanted, category, className, modalCard, isSubscribed, buttonAction},  ref) => {
  const dispatch = useDispatch();
  const currentEventId = useSelector(eventSelectors.getCurrentEvent);
  const isAlertOpen = useSelector(modalSelectors.getAlertOpen);

  const unsubscribeFromEvent = (eventId) => {
    axios.put( `/api/events/${eventId}/unsubscribe`)
      .then(function (response) {
        dispatch(userOperations.unSubscribeEventOperation(response.data.data));
      })
      .catch(console.log);

  };

  let show;

  if (isAlertOpen){
    if (currentEventId && currentEventId === id ) {
        show = <AlertElement textMessage="Вы действительно хотите отменить запрос?"
                          agreeAction={() => unsubscribeFromEvent(currentEventId)}/>
    }
  }

  return (
    <>
      {show}
      <span ref={ref}/>
      <EventsCard
        id={id}
        userId={userId}
        name={name}
        age={age}
        createDate={createDate}
        image={image}
        userpick={userpick}
        title={title}
        address={address}
        dateStart={dateStart}
        dateEnd={dateEnd}
        text={text}
        peopleWanted={peopleWanted}
        category={category}
        className={className}
        modalCard={modalCard}
        isSubscribed={isSubscribed}
        buttonAction={buttonAction}
      />
    </>
  )
});

EventCardWrapper.propTypes = {
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

EventCardWrapper.defaultProps = {
  address: '',
  dateStart: null,
  dateEnd: null,
  text: '',
  className: '',
  modalCard: false,
  isSubscribed: false,
  buttonAction: undefined,
};

export default memo(EventCardWrapper);