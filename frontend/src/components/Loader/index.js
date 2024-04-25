import React, { memo } from 'react';
import styles from './Loader.module.scss';

const Loader = () => {
  return (
      <div className={styles.loaderWrap}>
        <span className={styles.point} />
        <span className={`${styles.point} ${styles.active}`} />
        <span className={styles.point} />
      </div>
  );
};

export default memo(Loader);