import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import List from '../pages/List';
import Map from '../pages/Map';

const EventRoutes = () => {
    return (
        <Switch>
            <Route path="/home/events/list" component={List} />
            <Route path="/home/events/map" component={Map} />
            <Redirect from="/home/events/*" to="/page404"/>
        </Switch>
    )
};

export default EventRoutes;