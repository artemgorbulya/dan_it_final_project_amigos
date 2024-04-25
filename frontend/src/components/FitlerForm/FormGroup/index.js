import React, { memo, useState } from 'react';
import styles from "./FormGroup.module.scss";
import PropTypes from "prop-types";

const FormGroup = ({title, children, row}) => {
	const [hidden, setHidden] = useState(true);

	return (
		<div className={styles.formGroup}>
			<div className={styles.header}>
				<h3>{title}</h3>
				<div className={styles.orangeSquare} onClick={() => setHidden(!hidden)}>
					<img className={`${styles.arrow} ${!hidden && styles.arrowReversed}`} src="/assets/orangeArrow.svg" alt=""/>
				</div>
			</div>
			<div className={styles.separator}> </div>
			<div className={row ? styles.body : undefined}>
				{!hidden && children}
			</div>
		</div>
	)
}

FormGroup.propTypes = {
	title: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
	row: PropTypes.bool,
}

FormGroup.defaultProps = {
	title: "",
	children: "",
	row: false,
}

export default memo(FormGroup);