import React, { memo } from 'react';
import styles from './Button.module.scss';
import PropTypes from 'prop-types';

const Button = ({type, classList, action, disabled, children}) => {
    const styleList = classList
        .split(' ')
        .reduce((acumulator, item) => `${acumulator} ${styles[item]}` , '')
        .trim();

    return (
        <button  
            data-testid='testing-button'  
            type={type} 
            className={styleList}  
            onClick={action}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    action: PropTypes.func,
    classList: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
        PropTypes.object
    ]),
    type: PropTypes.string,
    disabled: PropTypes.bool
};

Button.defaultProps = {
    classList: 'btn',
    children: '',
    action: undefined,
    type: 'button',
    disabled: false
};


export default memo(Button);