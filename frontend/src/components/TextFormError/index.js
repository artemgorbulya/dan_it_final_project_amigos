import React, { memo } from 'react';
import styles from "./TextFormError.module.scss"
import PropTypes from "prop-types";

const TextFormError = (props) => {
    return (
        <div className={styles.text}>
            {props.error}
        </div>
    );
};

TextFormError.propTypes = {
    error: PropTypes.string,
    className: PropTypes.string,
};

TextFormError.defaultProps = {
    className: 'text',
    error: '',
};

export default memo(TextFormError);