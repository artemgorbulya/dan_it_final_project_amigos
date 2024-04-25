import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import AuthRoute from '../components/AuthRoute';
import Home from '../pages/Home';
import Landing from '../pages/Landing';
import Login from "../pages/Login";
import Register from "../pages/Register";
import {useSelector} from "react-redux";
import {userSelectors} from "../store/user";
import AddUserPhoto from "../pages/AddUserPhoto";
import Page404 from "../pages/Page404";
import About from "../pages/About";
import Questions from "../pages/Questions";
import Contacts from "../pages/Contacts";
import DeleteUserGoodbye from "../components/ChangeProfile/DeleteUserGoodbye";

const AppRoutes = () => {
	const isAuth = useSelector(userSelectors.getIsAuth);
	return (
		<Switch>
			<Route exact path="/" render = {() => isAuth ? <Home/> : <Landing/>} />
			<AuthRoute path="/home" component={Home}/>
			<Route exact path="/login" component={Login} />
			<Route exact path="/register" component={Register} />
			<Route exact path="/register/addphoto" component={AddUserPhoto} />
			<Route exact path="/about" component={About} />
			<Route exact path="/questions" component={Questions} />
			<Route exact path="/contacts" component={Contacts} />
			<Route exact path="/page404" component={Page404} />
			<Route exact path="/goodbye" component={DeleteUserGoodbye} />
			<Redirect from="/*" to="/page404"/>
		</Switch>
	)
};

export default AppRoutes;