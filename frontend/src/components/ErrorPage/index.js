import React, { memo } from 'react';
import styles from "./ErrorPage.module.scss";
import "../../scss/base/base.scss";

const ErrorPage = () => {
	return (
		<div className={styles.wrapper}>
			<div className="container">
				<div className={styles.content}>
					<img className={styles.logo} src="/assets/logo.png" alt=""/>
					<h2 className={styles.title}>Ooooops...</h2>
					<span className={styles.subTitle}>Something went wrong (</span>
				</div>
			</div>
		</div>
	)
}

export default memo(ErrorPage);