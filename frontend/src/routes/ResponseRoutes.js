import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import MyResponses from '../pages/MyResponses';
import MyRequests from '../pages/MyRequests';

const ResponseRoutes = () => {
    return (
        <Switch>
            <Route path="/home/responses/myresponses" component={MyResponses} />
            <Route path="/home/responses/myrequests" component={MyRequests} />
            <Redirect from="/home/responses/*" to="/page404"/>
        </Switch>
    )
};

export default ResponseRoutes;