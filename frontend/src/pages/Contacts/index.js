import React, { memo } from 'react';
import Header from "../../components/Header";
import HomePagesTitle from '../../components/HomePagesTitle';
import "../../scss/base/base.scss";
import styles from "./Contacts.module.scss";
import { NavLink } from 'react-router-dom';


const Contacts = () => {
    return (
        <>
            <Header />
            <div className="container">
                <HomePagesTitle title="Контакты" />
                <div className={styles.wrapper}>
                    <p><b>Наш e-mail</b></p>
                    <p>info@amigos.com</p>
                    <p><b>Команда разработчиков</b></p>
                    <p>Kateryna Leliukh</p>
                    <p>Margarita Dudenko</p>
                    <p>Illya Dubov</p>
                    <p>Serhii Gonchar</p>
                    <p>Artem Horbulia</p>
                    <p>Marina Kondratenko</p>
                    <p>Hanna Sachok</p>
                    <p><NavLink to="/home/events/list"><span>Вернуться на главную</span></NavLink></p>
                </div>
            </div>
        </>
    )

};

export default memo(Contacts);