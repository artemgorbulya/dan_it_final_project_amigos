import React, { memo } from 'react';
import styles from"./OrangeArrow.module.scss"
import PropTypes from "prop-types";
import {ORANGE_ARROW} from "../../assets/svg/svg";


const OrangeArrow = (props) => {
    return (
        <div className={styles.orangeArrow} onClick={props.onClick}>
            {ORANGE_ARROW}
        </div>
    );
};

OrangeArrow.propTypes = {
    className: PropTypes.string,
};

OrangeArrow.defaultProps = {
    className:"input",
};
export default memo(OrangeArrow);