import React, { memo } from 'react';
import EventResponseItemWrapper from "../EventResponseItemWrapper";
import Button from "../Button";
import PropTypes from 'prop-types';
import {getAge} from "../../utils/mathHelpels";
import {CHAT_ICON} from "../../assets/svg/svg";
import {useDispatch} from "react-redux";
import {modalOperations} from "../../store/modal";
import {eventOperations} from "../../store/event";
import useChatroom from '../../hooks/useChatroom';

const RequestEventList = ({list, isListApplied}) => {
    const dispatch = useDispatch();
    const createChatroom = useChatroom();
    const responseReaction = isListApplied ? 'Ваше предложение принято': '';

    const getCurrentEvent = (eventId) => {
        dispatch(eventOperations.getCurrentEventOperation(eventId));
        dispatch(modalOperations.toggleAlertOperation(true));
    };

    const reqList = list.map((eventItem, eventIndex) => {
        const {firstName, birthday, photos, sex} = eventItem.author;
        const agreement = sex === 'male' ? 'согласен' : 'согласна';
        const responseType = isListApplied ? `${agreement} пойти с Вами` : 'В ожидании';
        const year = getAge(birthday);

        return <EventResponseItemWrapper key={`${eventIndex}${eventItem.author._id}`}
                              eventId={eventItem._id}
                              userId={eventItem.author._id}
                              name={firstName}
                              age={year}
                              userPick={photos[0].photoURL}
                              eventTitle={eventItem.title}
                              responseType={responseType}
                              responseReaction={responseReaction}
                              dropAction={() => getCurrentEvent(eventItem._id)}
                              actions={isListApplied ? 
                                <Button 
                                    classList='btn btn--blue-violet btn--chat btn--modal'
                                    action={() => createChatroom(eventItem.author._id)}
                                >
                                    <span>{CHAT_ICON}</span> 
                                    Перейти в чат
                                </Button> : ''
                              }
        />
    });
        return (
            <>
                {reqList}
            </>
        )

};

RequestEventList.propTypes = {
    list:  PropTypes.array.isRequired,
    isListApplied: PropTypes.bool
};

RequestEventList.defaultProps = {
    isListApplied: false
};

export default memo(RequestEventList);