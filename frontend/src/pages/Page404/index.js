import React, { memo } from 'react';
import Header from "../../components/Header";
import styles from "./Page404.module.scss"
import HomePagesTitle from "../../components/HomePagesTitle";
const Page404 = () => {
    return (
        <div>
            <Header/>
            <div className={styles.page404}>
                <HomePagesTitle title='Страница не найдена'/>
                <img src="/oops.png"className={styles.oops}/>
                <img src="/page404.png" className={styles.img}/>
            </div>

        </div>
    );
};

export default memo(Page404);