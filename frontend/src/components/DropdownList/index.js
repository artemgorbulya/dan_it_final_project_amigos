import React, {memo, useState} from 'react';
import styles from './DropdownList.module.scss';
import PropTypes from 'prop-types';
import { useLayer, Arrow } from "react-laag";

const DropdownList = ({options, classList, stickedTop, profileDrop}) => {
    const [dropDownMenuOpen, setDropDownMenuOpen] = useState(false);
    const activeDropDownMenu = dropDownMenuOpen ? styles['icon--dots-menu--active'] : '';
    const dropStyle = profileDrop ? styles[`aside_button--profile`]
                           : (stickedTop ? styles.aside_button_stickedTop : styles.aside_button);

    const close = () => setDropDownMenuOpen(false);

    const optionsList = options.map((item, index) => <li key={index} onClick={close}>{item}</li>);
    const styleList = classList
        .split(' ')
        .reduce((acumulator, item) => `${acumulator} ${styles[item]}` , '')
        .trim();

    const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
        isOpen: dropDownMenuOpen,
        onOutsideClick: close,
        onDisappear: close,
        overflowContainer: false,
        auto: true,
        placement: "bottom-end",
        preferX: "left",
        triggerOffset: 3,
        containerOffset: 16,
        arrowOffset: 10
    });

    return (
        <>
            <div className={ dropStyle} {...triggerProps} onClick={() => setDropDownMenuOpen(!dropDownMenuOpen)}>
                <i className={`icon--dots-menu ${activeDropDownMenu}`}/>
            </div>
            {renderLayer(
                <div>
                    {dropDownMenuOpen && (
                        <ul {...layerProps} className={styleList}>
                            {optionsList}
                            <Arrow backgroundColor='#14ACEF' {...arrowProps}/>
                        </ul>
                    )}
                </div>
            )}
        </>
    );


};

DropdownList.propTypes = {
    classList: PropTypes.string,
    options: PropTypes.array.isRequired,
    profileDrop: PropTypes.string
};

DropdownList.defaultProps = {
    classList: 'list',
    profileDrop: ''
};


export default memo(DropdownList);