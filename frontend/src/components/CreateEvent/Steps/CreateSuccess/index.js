import React, { memo } from 'react';
import styles from './CreateSuccess.module.scss';

const CreateSuccess = () => (
    <>
        <p className={styles.createSuccess}>
            Поздравляем, ваше событие опубликовано!
        </p>
        <div className={styles.successImg}>
            <img src='/media/createEvent/create-success.png' alt="" />
        </div>
    </>
);

export default memo(CreateSuccess);