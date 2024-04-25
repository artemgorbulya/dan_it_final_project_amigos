import React, { memo } from 'react';
import MyProfileEventsCard from "../MyProfileEventsCard";
import {useDispatch, useSelector} from "react-redux";
import {eventSelectors} from "../../store/event";
import {modalSelectors} from "../../store/modal";
import AlertElement from "../AlertElement";
import axios from "axios";
import {userOperations} from "../../store/user";
import PropTypes from "prop-types";

const MyProfileEventCardWrapper = ({id, image, title, address, dateStart, dateEnd, text, category, peopleWanted, className, countResponses, modalCard}) => {
  const dispatch = useDispatch();
  const currentEventId = useSelector(eventSelectors.getCurrentEvent);
  const isAlertOpen = useSelector(modalSelectors.getAlertOpen);

  const deleteEvent = (eventId) => {
    axios.delete( `/api/events/${eventId}`)
      .then(function (response) {
        dispatch(userOperations.deleteEvent(response.data.data));
      })
      .catch(console.log);
  };

  let showDeleteEventAlert;

  if (isAlertOpen){
    if (currentEventId && currentEventId === id ) {
      showDeleteEventAlert = <AlertElement textMessage="Вы действительно хотите удалить это событие?"
                                           agreeAction={() => deleteEvent(currentEventId)}/>
    }
  }

  return (
    <>
      {showDeleteEventAlert}
      <MyProfileEventsCard
          id={id}
          image={image}
          title={title}
          address={address}
          dateStart={dateStart}
          dateEnd={dateEnd}
          text={text}
          category={category}
          peopleWanted={peopleWanted}
          className={className}
          countResponses={countResponses}
          modalCard={modalCard}
     />
    </>
  )
};

MyProfileEventCardWrapper.propTypes = {
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

MyProfileEventCardWrapper.defaultProps = {
  address: '',
  dateStart: null,
  dateEnd: null,
  text: '',
  className: '',
  modalCard: false,
  countResponses: 0
};

export default memo(MyProfileEventCardWrapper);