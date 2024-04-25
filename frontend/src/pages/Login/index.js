import React, { memo } from 'react';
import LoginUser from "../../components/LoginUser";
import Header from "../../components/Header";


const Login = () => {

		return (
			<>
				<Header/>
				<LoginUser/>
			</>
		)
};

export default memo(Login);