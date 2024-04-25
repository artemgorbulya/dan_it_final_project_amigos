import React, { memo } from 'react';
import {Form, Formik } from "formik";
import LanguageSelect from "./LanguageSelect";
import filterSchema from "./validation";
import FormGroup from "./FormGroup";
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from './Checkbox';
import {categoriesSelectors} from "../../store/categories";
import CategorySelect from './CategorySelect';
import MinAgeInput from './MinAgeInput';
import MaxAgeInput from './MaxAgeInput';
import styles from "./FilterForm.module.scss";
import Button from '../Button';
import {feedListActions, feedListOperations} from "../../store/feedList";
import { feedFilterOperations } from '../../store/feedFilter';

const FeedFilterForm = () => {
	const dispatch = useDispatch();
	const typesOfEvents = useSelector(categoriesSelectors.getCategories);

	return (
		<Formik
			validationSchema={filterSchema}
			initialValues={{	
				minAge: "",
				maxAge: "",
				languages: [],
				city: "",
				dateStart: "",
				peopleWanted: [],
				categories: [],
			}}
			onSubmit={() => {
				dispatch(() => feedListActions.setIsFiltered(true));
				dispatch(feedListOperations.getFeed(true));
			}}
		>
			{({handleSubmit, resetForm}) => (
				<Form>
					<FormGroup title="Я ищу">
						<Checkbox 
							name="peopleWanted" 
							value="boy" 
							text="Мужчину"
						/>
						<Checkbox 
							name="peopleWanted" 
							value="girl" 
							text="Девушку"
						/>
						<Checkbox 
							name="peopleWanted" 
							value="company" 
							text="Компанию"
						/>
						<Checkbox 
							name="peopleWanted" 
							value="no matter" 
							text="Не важно"
						/>
					</FormGroup>
					<FormGroup title="Категории" row>
						{typesOfEvents.map((category, index) => (
							<CategorySelect 
								key={index}
								name="categories"
								category={category}
							/>
						))}
					</FormGroup>
					<div className={styles.ageWrapper}>
						<label className={styles.ageLabel}>Возраст</label>
						<div className={styles.inputWrapper}>
							<MinAgeInput name="minAge" />
							<MaxAgeInput name="maxAge" /> 
						</div>
					</div>
					<LanguageSelect 
						name="languages" 
						placeholder="Выберите язык"
					/>
					<Button classList="form_button_submit form_width50 form_width50--left" type="submit" action={handleSubmit}>ПРИМЕНИТЬ</Button>
					<Button classList="close-button form_width50 form_width50--right" type="button" action={() => {
						dispatch(feedFilterOperations.resetAll());
						dispatch(feedListOperations.getFeed(true));
						resetForm();
					}}>СБРОСИТЬ</Button>
				</Form>
			)}
		</Formik>
	)
}

export default memo(FeedFilterForm);