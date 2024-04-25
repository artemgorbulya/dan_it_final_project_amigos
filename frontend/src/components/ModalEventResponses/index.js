import React, { memo } from 'react';
import styles from './ModalEventResponses.module.scss'
import {CHAT_ICON} from "../../assets/svg/svg";
import {useDispatch} from "react-redux";
import {userOperations} from "../../store/user";
import axios from "axios";
import Button from "../Button";
import EventsWrapper from "../EventsWrapper";
import EventResponse from "../EventResponse";
import {getAge} from "../../utils/mathHelpels";
import useChatroom from '../../hooks/useChatroom';
import useResponseModalClose from "../../hooks/useResponseModalClose";
import PropTypes from "prop-types";

const ModalEventResponses = ({currentEvent}) => {
    const dispatch = useDispatch();
    const createChatroom = useChatroom();
    const closeModal = useResponseModalClose();

    const gotoChat = (userId) => {
      closeModal();
      createChatroom(userId);
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

    const responseList = currentEvent?.applicants.map((applicant, aIndex) => {
            const {firstName, birthday, photos} = applicant;
            const year = getAge(birthday);
            const userId = applicant._id;

            return <EventResponse key={aIndex}
                                  eventId={currentEvent._id}
                                  userId={userId}
                                  name={firstName}
                                  age={year}
                                  userPick={photos[0].photoURL}
                                  modalResponse='true'
                                  responseType='хочет составить компанию'
                                  actions={[<Button key='1'
                                                               classList='btn btn--primary btn--modal'
                                                               action={() => allowUserToEvent(currentEvent._id, userId)}>
                                                 Пойти вместе
                                  </Button>, <Button key='2'
                                                                classList='btn btn--modal btn--light-grey'
                                                                action={() => denyUserFromEvent(currentEvent._id, userId)}>
                                                 В другой раз
                                             </Button>]}
                                  dropAction = {() => denyUserFromEvent(currentEvent._id, userId)}

            />
        });

    const allowedList = currentEvent?.membersAllowed.map((allowedUser, aIndex) => {
            const {firstName, birthday, photos} = allowedUser;
            const year = getAge(birthday);
            const userId = allowedUser._id;

            return <EventResponse key={`1${aIndex}`}
                                  eventId={currentEvent._id}
                                  userId={userId}
                                  name={firstName}
                                  age={year}
                                  userPick={photos[0].photoURL}
                                  modalResponse='true'
                                  responseType='хочет составить компанию'
                                  responseReaction='Вы приняли предложение'
                                  actions={[
                                    <Button action={() => gotoChat(allowedUser._id)}
                                            key='3' classList='btn btn--blue-violet btn--chat btn--modal'>
                                        <span >{CHAT_ICON}</span> Перейти в чат
                                    </Button>
                                  ]}
                                  dropAction = {() => denyUserFromEvent(currentEvent._id, userId)}
            />
        });

    return (
        <>
            <div className={styles[`modal-event-photo`]} style={{backgroundImage: `url(${currentEvent.photo})`}}/>
            <div className={styles.title}>{currentEvent.title}</div>
            <EventsWrapper>
              {!allowedList.length && !responseList.length &&
              <div className={styles[`no-respose-title`]}>новых откликов пока нет</div>}
                {allowedList}
                {responseList}
            </EventsWrapper>

        </>

    )};

ModalEventResponses.propTypes = {
  currentEvent: PropTypes.object,
};

ModalEventResponses.defaultProps = {
  currentEvent: null
};

export default memo(ModalEventResponses);