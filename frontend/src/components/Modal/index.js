import React, {memo, useEffect} from 'react';
import styles from './Modal.module.scss';
import PropTypes from 'prop-types';
import {useSelector} from "react-redux";
import {modalSelectors} from "../../store/modal";

const Modal = ({title, children, actions, closeModal, notCloseBack, menu, notHeaderClose}) => {
    const isAlertOpen = useSelector(modalSelectors.getAlertOpen);
    const closeBackground = () =>  notCloseBack ?  undefined : closeModal();

    useEffect(() => {
            const modal = document.querySelector(`.${styles.modal}`);
            modal.style[`overflow-y`] = isAlertOpen ? 'hidden' : 'auto';
    }, [isAlertOpen]);

    return (
        <div className={styles.modal} onClick={closeBackground}>
            <div className={styles.modal__content} onClick={e => e.stopPropagation()}>
                <div className={notHeaderClose ? styles.modal__header__padding : styles.modal__header}>
                    <h2>{title}</h2>
                    {!notHeaderClose && <span className={styles['close-span']} onClick={closeModal}>
                                              <i className="icon--cancel"/>
                                        </span>
                    }
                </div>
                {!!menu && menu}  {/*Если в модалку нужно добавить меню*/}
                <div className={styles.modal__text}>{children}</div>
                {actions.length !== 0 &&
                    <div className={styles.modal__actions}>
                        {actions}
                    </div>
                }
            </div>

        </div>
    );
};

Modal.propTypes = {
    actions: PropTypes.array,
    title: PropTypes.string,
    closeModal: PropTypes.func,
    notCloseBack: PropTypes.bool,
    notHeaderClose: PropTypes.bool,
};

Modal.defaultProps = {
    actions: [],
    title: '',
    closeModal: undefined,
    notCloseBack: undefined,
    notHeaderClose: undefined
};

export default memo(Modal);