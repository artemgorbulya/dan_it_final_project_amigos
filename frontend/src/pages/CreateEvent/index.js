import React, { memo } from 'react';
import CreateEventForm from "../../components/CreateEvent";
import HomePagesTitle from '../../components/HomePagesTitle';

const CreateEvent = () => {
	return (
	    <>
		    <HomePagesTitle title="Создать событие" />
            <CreateEventForm />
        </>
	);
}

export default memo(CreateEvent);