import React, { memo } from 'react';
import HomePagesTitle from '../../components/HomePagesTitle';
import styles from "./Messages.module.scss";
import MessageRoutes from '../../routes/MessageRoutes';

const Messages = () => {
	return (
		<div className={styles.wrapper}>
			<HomePagesTitle title="Сообщения" />
			<MessageRoutes />
		</div>
	)
}

export default memo(Messages);