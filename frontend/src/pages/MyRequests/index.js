import React, { memo } from 'react';
import EventsWrapper from "../../components/EventsWrapper";
import {useDispatch, useSelector} from "react-redux";
import RequestEventList from "../../components/RequestEventList";
import {userOperations, userSelectors} from "../../store/user";
import AlertElement from "../../components/AlertElement";
import {modalSelectors} from "../../store/modal";
import {eventSelectors} from "../../store/event";
import axios from "axios";
import styles from './MyRequests.module.scss';


const MyRequests = () => {
    const dispatch = useDispatch();
    const myRequests = useSelector(userSelectors.getDataUser).sentEvents;
    const appliedEvents = useSelector(userSelectors.getDataUser).appliedEvents;
    const isAlertOpen = useSelector(modalSelectors.getAlertOpen);
    const currentEventId = useSelector(eventSelectors.getCurrentEvent);
    const isModalOpen = useSelector(modalSelectors.getModalOpen);

  const unsubscribeFromEvent = (eventId) => {
    axios.put(`/api/events/${eventId}/unsubscribe`, {})
      .then(function (response) {
        dispatch(userOperations.unSubscribeEventOperation(response.data.data));
      })
      .catch(console.log);

  };

    return (
               <EventsWrapper>
                 {isAlertOpen && currentEventId && !isModalOpen
                     && <AlertElement
                            textMessage={'Вы действительно хотите отменить запрос?'}
                            agreeAction={() => unsubscribeFromEvent(currentEventId)}/>
                 }
                 {!myRequests?.length &&  !appliedEvents?.length
                     &&  <div className={styles[`no-respose-title`]}>запросов нет</div>
                 }
                    <RequestEventList list={appliedEvents} isListApplied={true}/>
                    <RequestEventList list={myRequests} />
                </EventsWrapper>
    )
};

export default memo(MyRequests);