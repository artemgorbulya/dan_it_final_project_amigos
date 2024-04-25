import React, { memo } from 'react';
import styles from "./Message.module.scss";
import createFormattedDate from "../../../utils/dateFormat";

const Message = React.forwardRef(({text, isMine, date}, ref) => {
	return (
		<div ref={ref} className={isMine ? styles.myMessageField : styles.messageField}>
			<p className={isMine ? styles.myDateMsg : styles.dateMsg}>{createFormattedDate(date)}</p>
			<p className={isMine ? styles.myMessage : styles.message}>
				{text}
			</p>
		</div>
	)
})

export default memo(Message);