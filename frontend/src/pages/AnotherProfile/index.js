import React, {useState, useEffect, memo} from 'react';
import {Redirect} from 'react-router-dom';
import styles from './AnotherProfile.module.scss';
import HomePagesTitle from '../../components/HomePagesTitle';
import EventsWrapper from '../../components/EventsWrapper';
import {useDispatch, useSelector} from "react-redux";
import {userOperations, userSelectors} from "../../store/user";
import axios from "axios";
import {getAge} from "../../utils/mathHelpels";
import AnotherUserProfile from "../../components/AnotherUserProfile";
import {categoriesSelectors} from "../../store/categories";
import EventCardWrapper from "../../components/EventCardWrapper";
import { feedListActions } from '../../store/feedList';


const AnotherProfile = ({match}) => {

    const profileId = parseInt(match.params.id, 10);
    const user = useSelector(userSelectors.getDataUser);
    const categoryList = useSelector(categoriesSelectors.getCategories);
    const [currentUser, setCurrentUser] = useState(null);
    const dispatch = useDispatch();
    const {sentEvents, appliedEvents} = user;


    useEffect(() => {
        axios.post( `/api/users/${profileId}`)
            .then(function (response) {
                setCurrentUser(response.data.data);
                dispatch(feedListActions.resetData());
            })
            .catch(console.log);
        }, []);


  const subscribeToEvent = (eventId) => {
    axios.put( `/api/events/${eventId}/subscribe`)
      .then(function (response) {
        dispatch(userOperations.subscribeEventOperation(response.data.data));
      })
      .catch(console.log);
  };


    let currentUserEventList;

    if (currentUser) {
        currentUserEventList = currentUser.events.map((eventItem, eventIndex) => {
            const {title, dateStart, dateEnd, description, category, address, photo, peopleWanted, updateDate} = eventItem;
            const eventAddress = address.address ? address.address : eventItem.city.fullAddress;
            const categoryObj = categoryList.find(elem => elem._id === category);
            const isSubscribed = sentEvents.find(item => item._id === eventItem._id)
                                 || appliedEvents.find(item => item._id === eventItem._id);

            return <EventCardWrapper
                key={eventIndex}
                id={eventItem._id}
                name={currentUser.firstName}
                age={getAge(currentUser.birthday)}
                createDate={updateDate}
                image={photo}
                userpick={currentUser.photos[0].photoURL}
                dateStart={dateStart}
                dateEnd={dateEnd}
                title={title}
                address={eventAddress}
                text={description}
                isSubscribed={isSubscribed}
                category={categoryObj}
                peopleWanted={peopleWanted}
                buttonAction={() => subscribeToEvent(eventItem._id)}
            />
        });
    }

    return (
        <>
            {(profileId === user._id) && <Redirect to='/home/profile'/>}
            <div className={styles.wrapper}>
                <HomePagesTitle title="Профиль"/>
                {currentUser && <AnotherUserProfile user={currentUser}/>}
                <EventsWrapper>
                    {currentUser && !currentUser.events.length &&
                    <div className={styles[`no-events-title`]}>нет созданых событий</div>}
                    {currentUserEventList}
                </EventsWrapper>
            </div>
        </>

    )
};

export default memo(AnotherProfile);