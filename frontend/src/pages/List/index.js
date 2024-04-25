import React, {memo, useCallback, useEffect, useRef} from 'react';
import styles from './List.module.scss';
import EventsWrapper from '../../components/EventsWrapper';
import EventCardWrapper from "../../components/EventCardWrapper";
import {feedListOperations, feedListSelectors} from "../../store/feedList";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import {userOperations, userSelectors} from "../../store/user";
import Loader from "../../components/Loader";
import {getAge} from "../../utils/mathHelpels";

const List = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector(feedListSelectors.getCurrentPage);
    const loading = useSelector(feedListSelectors.getIsLoading);
    const nextPage = useSelector(feedListSelectors.getNextPage);
    const list = useSelector(feedListSelectors.getFeedList);
    const user = useSelector(userSelectors.getDataUser);
    const {sentEvents, appliedEvents} = user;


	useEffect(() => {
		if (loading) return;
		if (!nextPage) return;
		if (list.length) return;
		dispatch(feedListOperations.getFeed(false));
	});

	const observer = useRef();
	const lastElemRef = useCallback(node => {
		if (loading) return;
		if (observer.current) observer.current.disconnect()
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && nextPage) {
					dispatch(feedListOperations.getFeed());
			}
		});
		if (node) observer.current.observe(node);
	}, [dispatch, loading, nextPage]);

    const subscribeToEvent = (eventId) => {
        axios.put( `/api/events/${eventId}/subscribe`)
            .then(function (response) {
                dispatch(userOperations.subscribeEventOperation(response.data.data));
            })
            .catch(console.log);
    };

    const createFeed = () => {
        if (!currentPage) return;
        return list.map((item, index) => {
            const eventAddress = item.address.address ? item.address.address : item.city.fullAddress;
            const isSubscribed = sentEvents.find(eventItem => item._id === eventItem._id)
                                       || appliedEvents.find(eventItem => item._id === eventItem._id);

            if (index + 1 === list.length) {
                return <EventCardWrapper
                    ref={lastElemRef}
                    key={index}
                    id={item._id}
                    userId={item.author._id}
                    name={item.author.firstName}
                    age={getAge(item.author.birthday)}
                    createDate={item.updateDate}
                    image={item.photo}
                    userpick={item.author.photos[0].photoURL}
                    dateStart = {item.dateStart}
                    dateEnd = {item.dateEnd}
                    title={item.title}
                    address={eventAddress}
                    isSubscribed={isSubscribed}
                    text={item.description}
                    category={item.category}
                    buttonAction={() => subscribeToEvent(item._id)}
                    peopleWanted={item.peopleWanted}
                />
            }
            return <EventCardWrapper
                key={index}
                id={item._id}
                userId={item.author._id}
                name={item.author.firstName}
                age={getAge(item.author.birthday)}
                createDate={item.updateDate}
                image={item.photo}
                userpick={item.author.photos[0].photoURL}
                dateStart = {item.dateStart}
                dateEnd = {item.dateEnd}
                title={item.title}
                address={eventAddress}
                isSubscribed={isSubscribed}
                text={item.description}
                category={item.category}
                buttonAction={() => subscribeToEvent(item._id)}
                peopleWanted={item.peopleWanted}
            />
        })
    };

	return (
		<div className={styles.wrapper}>
			<EventsWrapper>
        {loading && <Loader/>}
				{createFeed()}
			</EventsWrapper>
		</div>
	)
};

export default memo(List);