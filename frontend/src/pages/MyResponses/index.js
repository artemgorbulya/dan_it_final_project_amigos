import React, { memo } from 'react';
import EventsWrapper from "../../components/EventsWrapper";
import Button from "../../components/Button";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import {userOperations, userSelectors} from "../../store/user";
import EventResponseItemWrapper from "../../components/EventResponseItemWrapper";
import {CHAT_ICON} from "../../assets/svg/svg";
import {getAge} from "../../utils/mathHelpels";
import AlertElement from "../../components/AlertElement";
import {eventOperations, eventSelectors} from "../../store/event";
import {modalOperations, modalSelectors} from "../../store/modal";
import useChatroom from '../../hooks/useChatroom';
import styles from './MyResponses.module.scss'

const MyResponses = () => {
    const myEvents = useSelector(userSelectors.getDataUser).events;
    const currentEventId = useSelector(eventSelectors.getCurrentEvent);
    const currentUserId = useSelector(eventSelectors.getCurrentUser);
    const isAlertOpen = useSelector(modalSelectors.getAlertOpen);
    const isModalOpen = useSelector(modalSelectors.getModalOpen);
    const dispatch = useDispatch();
    const createChatroom = useChatroom();

   const getCurrentEvent = (eventId, userId) => {
       dispatch(eventOperations.getCurrentEventOperation(eventId));
       dispatch(eventOperations.getCurrentUserOperation(userId));
       dispatch(modalOperations.toggleAlertOperation(true));
   };

    const allowUserToEvent = (eventId, userId) => {
        axios.put( `/api/events/${eventId}/allow`, {
           userID: userId,
        })
            .then(function (response) {
                dispatch(userOperations.changeEventContentOperation(response.data.data));
            })
            .catch(console.log);
    };

    const denyUserFromEvent = (eventId, userId) => {
        axios.put( `/api/events/${eventId}/deny`, {
            userID: userId,
        })
            .then(function (response) {
                dispatch(userOperations.changeEventContentOperation(response.data.data));
            })
            .catch(console.log);
    };

    const responseList = myEvents.map((eventItem, eventIndex) => {
        const {title} = eventItem;
        const eventItemId = eventItem._id;

            return  eventItem.applicants.map((applicant, aIndex) => {
                const {firstName, birthday, photos} = applicant;
                const year = getAge(birthday);
                const userId = applicant._id;

                return <EventResponseItemWrapper key={`${eventIndex}${aIndex}`}
                                                 eventId={eventItemId}
                                                 eventTitle={title}
                                                 userId={userId}
                                                 name={firstName}
                                                 age={year}
                                                 userPick={photos[0].photoURL}
                                                 responseType='хочет составить компанию'
                                                 actions={[<Button key='1'
                                                                   classList='btn btn--primary btn--modal'
                                                                   action={() => allowUserToEvent(eventItemId, userId)}>
                                                     Пойти вместе
                                                 </Button>, <Button key='2'
                                                                    classList='btn btn--modal btn--light-grey'
                                                                    action={() => denyUserFromEvent(eventItemId, userId)}>
                                                     В другой раз
                                                 </Button>]}
                                                 dropAction = {() => getCurrentEvent(eventItemId, userId)}

                />
            })

    }).flat(2);

    const allowedList = myEvents.map((eventItem, eventIndex) => {
        const {title} = eventItem;
        const eventItemId = eventItem._id;

        return eventItem.membersAllowed.map((allowedUser, aIndex) => {
            const {firstName, birthday, photos} = allowedUser;
            const year = getAge(birthday);
            const userId = allowedUser._id;
            return <EventResponseItemWrapper key={`1${eventIndex}${aIndex}`}
                                             eventId={eventItemId}
                                             eventTitle={title}
                                             userId={userId}
                                             name={firstName}
                                             age={year}
                                             userPick={photos[0].photoURL}
                                             responseType='хочет составить компанию'
                                             responseReaction='Вы приняли предложение'
                                             actions={[
                                                <Button 
                                                    key='3' 
                                                    classList='btn btn--blue-violet btn--chat btn--modal' 
                                                    action={() => createChatroom(allowedUser._id)}
                                                >
                                                    <span>{CHAT_ICON}</span> Перейти в чат
                                                </Button>
                                             ]}
                                             dropAction = {() => getCurrentEvent(eventItemId, userId)}
            />
        })
    }).flat(2);

    return (
            <EventsWrapper>
                {isAlertOpen && currentEventId && !isModalOpen
                  && <AlertElement
                         textMessage={'Вы действительно хотите удалить отклик?'}
                         agreeAction={() => denyUserFromEvent(currentEventId, currentUserId)}
                />}
                {!allowedList.length && !responseList.length &&
                   <div className={styles[`no-respose-title`]}>откликов нет</div>}
                {allowedList}
                {responseList}
            </EventsWrapper>


    )
};

export default memo(MyResponses);