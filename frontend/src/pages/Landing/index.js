import React, { memo } from 'react';
import {Link} from 'react-router-dom';
import styles from './Landing.module.scss';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import FlipNumbers from 'react-flip-numbers';

const Landing = () => {
	return (
		<>
			<section className={styles.topWrap} style={{backgroundImage: 'url("/background/background.png")'}}>
				<div className={styles.logo}>
					<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 149.627 38.384'>
						<path id='SvgjsG2014' className={styles.logoAnimate} d='M16.4,37.862h6.643V59.723H16.4V57.537c-.294.757-2.27,2.607-5.633,2.607C5.76,60.144,0,56.57,0,48.751A10.775,10.775,0,0,1,10.763,37.483a7.247,7.247,0,0,1,5.633,2.4ZM11.729,54.3c2.733,0,4.961-1.892,4.961-5.549,0-3.531-2.228-5.423-4.961-5.423a5.107,5.107,0,0,0-5.3,5.423A5.143,5.143,0,0,0,11.729,54.3ZM56.546,37.525c4.667,0,8.787,3.027,8.787,10.427V59.723H58.691V48.162c0-2.775-1.177-4.877-4.246-4.877-2.564,0-4.288,2.27-4.793,4.288v12.15H43.009V48.162c0-2.775-1.724-4.877-4.246-4.877a4.734,4.734,0,0,0-4.793,4.288v12.15H27.327V37.862H33.97v3.994c.084-1.009,2.228-4.33,6.516-4.33a9.274,9.274,0,0,1,7.988,4.751A8.9,8.9,0,0,1,56.546,37.525ZM76.012,30v5.591H69.369V30Zm0,7.862V59.723H69.369V37.862Zm20.011,0h6.643V59.723c0,6.643-6.727,8.661-11.6,8.661a13.01,13.01,0,0,1-5.76-1.093V61.868a12.869,12.869,0,0,0,5.76,1.009c3.91,0,4.961-2.018,4.961-3.153V57.537c-.294.757-2.27,2.607-5.633,2.607-5,0-10.763-3.574-10.763-11.394A10.775,10.775,0,0,1,90.39,37.483a7.246,7.246,0,0,1,5.633,2.4ZM91.357,54.3c2.733,0,4.961-1.892,4.961-5.549,0-3.531-2.228-5.423-4.961-5.423a5.107,5.107,0,0,0-5.3,5.423A5.143,5.143,0,0,0,91.357,54.3ZM117.8,37.483c4.961,0,11.52,3.742,11.52,11.394,0,7.693-6.558,11.267-11.52,11.267s-11.519-3.574-11.519-11.267C106.282,41.225,112.84,37.483,117.8,37.483Zm0,5.844a5.17,5.17,0,0,0-5.087,5.55,5.117,5.117,0,1,0,10.217,0,5.2,5.2,0,0,0-5.13-5.55Zm25.519,1.429c-.588-1.513-1.471-2.018-2.438-2.018-.883,0-1.766.5-1.766,1.345,0,.8.5,1.261,1.471,1.6l2.775.967c3.111,1.135,6.264,2.27,6.264,6.643,0,4.414-4.414,6.937-8.955,6.937-4.078,0-7.9-2.4-8.829-6.222l5.213-1.64a3.82,3.82,0,0,0,3.616,2.606,2.137,2.137,0,0,0,2.354-1.766c0-.42-.336-.967-1.387-1.387l-2.565-.925c-4.372-1.6-6.432-3.826-6.432-6.937,0-4.078,3.784-6.474,7.946-6.474a8.361,8.361,0,0,1,8.325,5.8Z'
							  transform='translate(0 -30)' fill='#ff652c' />
					</svg>
				</div>
				<div className={styles.controls}>
					<Link to='/register' className={styles.linkBtn}>
						<Button classList='btn btn--stroke-orange btn--landing'>Регистрация</Button>
					</Link>
					<Link to='/login' className={styles.linkBtn}>
						<Button classList='btn btn--primary'>Вход</Button>
					</Link>
					<svg className={styles.arrows}>
						<path d="M0 0 L30 32 L60 0" />
						<path d="M0 20 L30 52 L60 20" />
						<path d="M0 40 L30 72 L60 40" />
					</svg>
				</div>
			</section>
			<section className={styles.aboutWrap}>
				<div className='container'>
					<svg className={styles.arrows}>
						<path d="M0 0 L30 32 L60 0" />
						<path d="M0 20 L30 52 L60 20" />
						<path d="M0 40 L30 72 L60 40" />
					</svg>
					<h2 className={styles.aboutHeader}>О проекте</h2>
					<p className={styles.aboutDesc}>
						Мы сделали сервис, который объединяет людей по интересам. Вы и есть организатор встречи, а,
						значит, можете приглашать других на свое мероприятие. Заполните свободное время интересными событиями.
						Ищите из актуальных объявлений или создавайте свое событие бесплатно прямо сейчас.
					</p>
					<div className={styles.features}>
						<p className={styles.title}>stay social</p>
						<div className={styles.featureItems}>
							<div className={styles.featureItem}>
								<div className={styles.featureIcon}>
									<i className='icon--profile-circle' />
								</div>
								<h3>Находите друзей</h3>
							</div>
							<div className={styles.featureItem}>
								<div className={styles.featureIcon}>
									<i className='icon--edit-sqaure' />
								</div>
								<h3>Создавайте события</h3>
							</div>
							<div className={styles.featureItem}>
								<div className={styles.featureIcon}>
									<i className='icon--search' />
								</div>
								<h3>Поиск встреч</h3>
							</div>
							<div className={styles.featureItem}>
								<div className={styles.featureIcon}>
									<i className='icon--text-circle' />
								</div>
								<h3>Личные чаты</h3>
							</div>
						</div>
						<span className={styles.subtitle}>найди классных людей вроде тебя</span>
						<div className={styles.counter}>
							<FlipNumbers height={64} width={40} color="#14ACEF" play numbers="101295" duration='3' numberStyle={{ fontSize: '45px' }} />
							<br /><span>уже с нами</span>
						</div>
					</div>
				</div>
				<div className={styles.arrow}>
					<Link to='/register'>
						<Button classList='joinBtn'>Присоединиться</Button>
					</Link>
					<Link to='/login' className={styles.link}>Уже есть аккаунт?</Link>
				</div>
				<img src='/media/landingPage/face-map.png' className={styles.map} alt=''/>
			</section>
			<section className={styles.cardsWrap}>
				<div className={`container ${styles.cardsBlock}`}>
					<div className={styles.card}>
						<div className={styles.cardImage} style={{backgroundImage: 'url("/media/landingPage/user1.jpg")'}} />
						<div className={styles.cardInfo}>
							<p className={styles.cardText}>Друг на час. Не скучай, давай встретимся</p>
							<div className={styles.cardLocation}>
								<div className={styles.cardIcon}>
									<i className='icon--map-marker' />
								</div>
								<div className={styles.cardPlace}>Киев, Блокбастер</div>
							</div>
						</div>
					</div>
					<div className={styles.card}>
						<div className={styles.cardImage} style={{backgroundImage: 'url("/media/landingPage/user3.jpg")'}} />
						<div className={styles.cardInfo}>
							<p className={styles.cardText}>Я фотограф 📸 Сделаю для вас лучшие снимки!</p>
							<div className={styles.cardLocation}>
								<div className={styles.cardIcon}>
									<i className='icon--map-marker' />
								</div>
								<div className={styles.cardPlace}>Киев, Андреевский спуск</div>
							</div>
						</div>
					</div>
					<div className={styles.card}>
						<div className={styles.cardImage} style={{backgroundImage: 'url("/media/landingPage/user2.jpeg")'}} />
						<div className={styles.cardInfo}>
							<p className={styles.cardText}>Ищу компанию сходить на кофе</p>
							<div className={styles.cardLocation}>
								<div className={styles.cardIcon}>
									<i className='icon--map-marker' />
								</div>
								<div className={styles.cardPlace}>Львов</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>
	)
};

export default memo(Landing);