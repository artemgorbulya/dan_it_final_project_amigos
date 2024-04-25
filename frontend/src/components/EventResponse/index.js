import React, { memo } from 'react';
import styles from "./EventResponse.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {modalOperations, modalSelectors} from "../../store/modal";
import {eventOperations} from "../../store/event";
import DropdownList from "../DropdownList";
import {DELETE_ICON} from "../../assets/svg/svg";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';


const EventResponse = ({eventId, userId, name, age, userPick, title, responseType, responseReaction, actions, dropAction, modalResponse}) => {

    const wrapperStyle = modalResponse ? styles[`wrapper--modal`] : styles.wrapper;
    const actionsStyle = modalResponse ? styles['actions-wrapper--modal'] : styles['actions-wrapper'];
    const infoStyle = modalResponse ? styles['info__block--modal'] : styles.info__block;
    const isModalOpen = useSelector(modalSelectors.getModalOpen);
    const dispatch = useDispatch();

    const openModal = (eventId) => {
        dispatch(eventOperations.getCurrentEventOperation(eventId));
        dispatch(eventOperations.getCurrentUserOperation(userId));
        dispatch(modalOperations.toggleModalOperation(true));
    };

    const showUserProfile = () => {
       if (!isModalOpen) return;
       dispatch(modalOperations.toggleModalOperation(false));
    };

    return (
        <div key={eventId} className={wrapperStyle}>
            <div className={infoStyle}>
                <div className={styles.user__block}>
                    <Link to={`/home/profile/${userId}`} onClick={showUserProfile}>
                        <div className={styles.user__img} style={{backgroundImage: `url(${userPick})`}}>
                            <div className={styles.img__sticker}><i className={`icon--clap`}/></div>
                        </div>
                    </Link>


                    <div className={styles.user__info}>
                        <Link to={`/home/profile/${userId}`} onClick={showUserProfile}>
                            <div className={styles.user__name}>{name}, {age}</div>
                        </Link>
                        <div className={styles.response__type}>{responseType}</div>
                        {responseReaction && <div className={styles.response__reaction}>{responseReaction}</div>}
                    </div>
                </div>

                {!modalResponse && <div className={styles.response__title} onClick={() => openModal(eventId, userId)}>
                    <i className='icon--map-marker'/> {title}
                </div>}
            </div>

            <div className={actionsStyle}>
                {actions}
            </div>

            <DropdownList options={[<div className={styles['dropdown_item-wrapper']} onClick={dropAction}>
                                       {DELETE_ICON} Удалить
                                    </div>]}
            />
        </div>
    )
};

EventResponse.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  userPick: PropTypes.string.isRequired,
  title: PropTypes.string,
  responseType: PropTypes.string.isRequired,
  responseReaction: PropTypes.string,
  actions: PropTypes.oneOfType([
                       PropTypes.array,
                       PropTypes.object,
                       PropTypes.string]),
  dropAction: PropTypes.func,
  modalResponse: PropTypes.oneOfType([
                            PropTypes.string,
                            PropTypes.bool])
};

EventResponse.defaultProps = {
  responseReaction: '',
  actions: '',
  modalResponse: false,
  title: '',
};

export default memo(EventResponse);
