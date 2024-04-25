import React, { memo } from 'react';
import styles from "./EventsFilterPanel.module.scss";
import {modalOperations, modalSelectors} from "../../store/modal";
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal';
import FilterForm from '../FitlerForm';
import Button from '../Button';
import { feedFilterOperations, feedFilterSelectors } from '../../store/feedFilter';
import FilterCard from './FilterCard';
import FilterWrapper from './FilterWrapper';
import { categoriesSelectors } from '../../store/categories';
import { feedListOperations } from '../../store/feedList';

const EventsFilterPanel = () => {
	const dispatch = useDispatch();
	const isModalOpen = useSelector(modalSelectors.getModalOpen);
	const storedCategories = useSelector(categoriesSelectors.getCategories);
	const filterData = useSelector(feedFilterSelectors.getAll);

	const showFilterModal = () => {
		dispatch(modalOperations.toggleModalOperation(true));
	}

	const closeModal = () => {
		dispatch(modalOperations.toggleModalOperation(false));
	};

	const clearAge = (minAge, maxAge) => {
		const res = [];
		if (minAge) res.push(feedFilterOperations.deleteMinAge());
		if (maxAge) res.push(feedFilterOperations.deleteMaxAge());
		return res;
	}

	const resetFilter = () => {
		dispatch(feedFilterOperations.resetAll());
		dispatch(feedListOperations.getFeed(true));
	}

	const renderResetBtn = () => {
		return (
			filterData.minAge === null &&
			filterData.maxAge === null &&
			!filterData.languages.length &&
			!filterData.peopleWanted.length &&
			!filterData.categories.length ) ? false : <Button classList="filter-clear-btn" action={resetFilter}>Сбросить фильтры</Button>;
	}

	const createFilterTitles = () => {
		const {minAge, maxAge, languages, peopleWanted, categories} = filterData;
		const res = [];
		if (minAge || maxAge) {
			res.push(
				<FilterWrapper key={1} title="Возраст" action={clearAge(minAge, maxAge)}>
					{!!minAge && <FilterCard title={`от ${minAge}`} action={feedFilterOperations.deleteMinAge()} />}
					{!!maxAge && <FilterCard title={`до ${maxAge}`} action={feedFilterOperations.deleteMaxAge()} />}
				</FilterWrapper>
			)
		}
		if (languages.length) {
			res.push(
				<FilterWrapper key={2} title="Владение языками" action={languages.map(lang => feedFilterOperations.deleteLanguage(lang))}>
					{languages.map((lang, i) => (
						<FilterCard 
							key={i}
							title={lang}
							action={feedFilterOperations.deleteLanguage(lang)}
						/>
					))}
				</FilterWrapper>
			)
		}
		if (peopleWanted.length) {
			res.push(
				<FilterWrapper key={3} title="С кем пойти" action={peopleWanted.map(data => feedFilterOperations.deletePeopleWanted(data))}>
					{peopleWanted.map((item, i) => (
						<FilterCard 
							key={i}
							title={
								item === 'girl' ? "Девушка" :
								item === 'boy' ? "Мужчина" :
								item === 'company' ? "Компания" : "Не важно"
							}
							action={feedFilterOperations.deletePeopleWanted(item)}
						/>
					))}
				</FilterWrapper>
			)
		}
		if (categories.length) {
			res.push(
				<FilterWrapper key={4} title="Категории" action={categories.map(category => feedFilterOperations.deleteCategory(category))}>
					{categories.map((item, i) => (
						<FilterCard 
							key={i}
							title={storedCategories.find(category => category._id === item).title}
							action={feedFilterOperations.deleteCategory(item)}
						/>
					))}
				</FilterWrapper>
			)
		}
		return res.length ? res : <span className={styles.notChosen}>Не выбрано</span>;
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.filterData}>
 				<span className={styles.title}>Фильтры:</span> 
				<div className={styles.filters}>
					{createFilterTitles()}
				</div>
			</div>
			<div className={styles.controls}>
				{renderResetBtn()}
				<i className={`icon--equalizer ${styles.equalizer}`} onClick={showFilterModal} />
			</div>
			{isModalOpen && 
				<Modal notCloseBack notHeaderClose title="Фильтр событий" closeModal={closeModal}>
					<FilterForm modalCloseHandler={closeModal} />
				</Modal>
			}
		</div>
	)
}

export default memo(EventsFilterPanel);