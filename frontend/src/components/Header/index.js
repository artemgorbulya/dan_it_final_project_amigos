import React, {memo, useEffect} from 'react';
import styles from './Header.module.scss';
import "../../scss/base/base.scss"
import {Link, NavLink} from "react-router-dom";
import Button from "../Button";
import {useDispatch, useSelector} from "react-redux";
import {modalOperations, modalSelectors} from "../../store/modal";
import {userSelectors} from "../../store/user";
import useLogout from '../../hooks/useLogout';

const Header = () => {
    const burgerMenuOpen = useSelector(modalSelectors.getBurgerMenuOpen);
    const isAuth = useSelector(userSelectors.getIsAuth);
    const hiddenClass = !burgerMenuOpen ? styles['header--hidden'] : '';
    const logout = useLogout();

    const dispatch = useDispatch();

    const closeBurgerMenu = () => {
        dispatch(modalOperations.toggleBurgerMenuOperation(false));
    };

    return (
        <header className={`${styles.header} ${hiddenClass}`}>
            <div className="container">
                <div className={styles.header__content}>
                    <div className={styles['close-header__wrapper']}>
                       <span className={styles['close-header']} onClick={closeBurgerMenu}>
                           <i className='icon--cancel'/></span>
                    </div>

                    <Link className={styles.logo__link} to="/home/events/list" onClick={closeBurgerMenu}>
                        <img src="/assets/logo.png" alt="logo"/>
                    </Link>

                    <div className={styles.header__pannel}>

                        <ul className={styles.header__nav}>
                            <li>
                                <NavLink activeClassName={styles.navlink__selected} className={styles.navlink}
                                         to="/about" onClick={closeBurgerMenu}>
                                    О нас</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName={styles.navlink__selected} className={styles.navlink}
                                         to="/questions" onClick={closeBurgerMenu}>
                                    Вопросы и ответы</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName={styles.navlink__selected} className={styles.navlink}
                                         to="/contacts" onClick={closeBurgerMenu}>
                                    Контакты</NavLink>
                            </li>
                        </ul>

                        {isAuth && <div className={styles.btn__wrapper}>
                              <Link to='/login'>
                            <Button classList='btn btn--stroke-orange btn--header btn--header-mobile' action={logout}>
                                <span className={styles.header__icon}> <i className={`icon--logout`}/> </span>
                                Выйти
                            </Button>
                        </Link>
                        </div>}
                    </div>

                </div>
            </div>
        </header>

    );
};

export default memo(Header);