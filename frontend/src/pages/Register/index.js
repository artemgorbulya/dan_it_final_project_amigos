import React, { memo } from 'react';
import CreateProfile from "../../components/CreateProfile";
import Header from "../../components/Header";
import styles from "./Register.module.scss"


const Register = () => {
	return (
		<div className={styles.registerPage}>
			<Header />
			<CreateProfile/>
			<div className={styles.text}>
				Продолжая, вы принимаете <a> пользовательское соглашение,политику обработки и защиты персональных данных</a>,
				а также подтверждаете согласие на <a> обработку персональных данных</a> и что вам есть 16 лет.
			</div>
		</div>
	)
};

export default memo(Register);