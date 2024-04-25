import React, { memo } from 'react';
import styles from "./HeaderChangeProfile.module.scss"
import {NavLink} from "react-router-dom";

const HeaderChangeProfile = () => {
    return (
        <div className={styles.headerBox}>
            <NavLink
                to={"/home/profile/changeUser/general"}
                className={styles.itemHeaderMenu}
                activeClassName={styles.activeItem}
            >
                <div > основное </div>
            </NavLink>
            <NavLink
                to={"/home/profile/changeUser/password"}
                className={styles.itemHeaderMenu}
                activeClassName={styles.activeItem}
            >
                <div > пароль </div>
            </NavLink>
            <NavLink
                to={"/home/profile/changeUser/delete-user"}
                className={styles.itemHeaderMenu}
                activeClassName={styles.activeItem}
            >
                <div> удалить аккаунт </div>
            </NavLink>
        </div>
    );
};

export default memo(HeaderChangeProfile);