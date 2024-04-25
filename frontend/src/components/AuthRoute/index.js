import React, { memo } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {useSelector} from "react-redux";
import {userSelectors} from "../../store/user";

const AuthRoute = (props) => {
	const isAuth = useSelector(userSelectors.getIsAuth);

	return (
		<>
			{isAuth && <Route {...props} />}
			{!isAuth && <Redirect to="/" />}
		</>
	)
};

export default memo(AuthRoute);
