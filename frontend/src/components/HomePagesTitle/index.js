import React, { memo } from 'react';
import styles from "./HomePagesTitle.module.scss";
import {useDispatch} from "react-redux";
import {modalOperations} from "../../store/modal";
import PropTypes from 'prop-types';

const HomePagesTitle = ({title, children}) => {
	const dispatch = useDispatch();

	const showHeader = () => {
		dispatch(modalOperations.toggleBurgerMenuOperation(true));
	};

	return (
		<div className={styles.wrapper}>
			<div className={children ? styles.infoWrapper : styles.infoWrapperReversed}>
				{children}
				<h1 className={styles.titleText}>{title}</h1>
			</div>
			<div className={styles.menuBlock}>
				<div className={styles.separator}/>
				<div className={styles.burger} onClick={showHeader}>
					<i className="icon--burger"/>
				</div>
			</div>
		</div>
	)
};

HomePagesTitle.propTypes = {
	title: PropTypes.string
};

HomePagesTitle.defaultProps = {
	title: ''
};

export default memo(HomePagesTitle);