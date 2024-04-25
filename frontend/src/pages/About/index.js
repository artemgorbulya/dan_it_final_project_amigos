import React, { memo } from 'react';
import Header from "../../components/Header";
import HomePagesTitle from '../../components/HomePagesTitle';
import "../../scss/base/base.scss";
import styles from "./About.module.scss";
import { NavLink } from 'react-router-dom';


const About = () => {
    return (
        <>
            <Header />
            <div className="container">
                <HomePagesTitle title="О нас" />
                <div className={styles.wrapper}>
                <p><b>Что такое Amigos, как им пользоваться и зачем – вот о чем вы узнаете в этом разделе.</b></p>

                    <p><b>Что такое Amigos?</b></p>

                    <p>Amigos – это соцсеть, где можно создать событие, выбрать занятие по душе и собрать компанию. Мы сделали сервис, который объединяет людей по интересам. Вы - и есть организатор встречи, а, значит, можете приглашать других на свое мероприятие.
                    Сервис работает и как афиша, поэтому вы будете знать, что интересного происходит в городе сегодня или через неделю. Наблюдайте не только за событиями, но и за локациями. Находите музеи, бизнес-центры, бары – любые места Киева.</p>

                    <p><b>Как это работает?</b></p>

                    <p>Использовать сайт Amigos просто: пользователь может быть и участником, и организатором события. Откликнуться на встречу или создать свою, опубликовать и получить отклики.</p>

                    <p><b>Кто организует события с помощью Amigos?</b></p>

                    <p>Организовать событие может любой человек, который планирует заполнить свободное время интересными событиями. Нужно лишь быть зарегистрированным в сервисе.</p>

                    <p><b>Что особенного в Amigos?</b></p>

                    <p>Мы позиционируем себя как соцсеть, но понимаем, что это слишком простое описание. Amigos - это про поиск друзей, компании и даже возлюбленных. На встречах, организованных с нами, люди становятся командой и встречаются чаще.
Amigos - еще и афиша. Мы следим за интересными событиями и локациями - постоянно обновляем подборку. Вместе с нами вы будете знать обо всем, что и где происходит в вашем городе.</p>

                    <p>
                    <NavLink to="/home/events/list"><span>Вернуться на главную</span></NavLink>
                    </p>
                    </div>
            </div>
        </>
    )

};

export default memo(About);