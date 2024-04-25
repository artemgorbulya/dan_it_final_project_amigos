import React, { memo } from 'react';
import styles from "./MyProfileLang.module.scss";

const MyProfileLang = ({children}) => {

	return (
		<>
			<div className={styles.wrapper}>
					{children}
			</div>
		</>
	)
}

export default memo(MyProfileLang);