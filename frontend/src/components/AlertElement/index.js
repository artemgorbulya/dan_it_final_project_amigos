import React, { memo } from 'react';
import styles from "./AlertElement.module.scss"
import Button from "../Button";
import PropTypes from 'prop-types';
import useEventAlertClose from "../../hooks/useEventAlertClose";

const AlertElement = ({textMessage, agreeAction}) => {
    const close = useEventAlertClose();

    const agree = () => {
        agreeAction();
        close();
    };

    return (
        <div className={styles.box} onClick={close}>
            <div className={styles.alertElement} onClick={e => e.stopPropagation()}>
                <div className={styles.textAlert}>{textMessage}</div>
                <div className={styles.alert__actions}>
                    <Button classList='btn  btn--modal btn--agree' action={agree}> Ок </Button>
                    <Button classList='btn  btn--modal btn--light-grey' action={close}> Отмена </Button>
                </div>
            </div>
        </div>
    );
};

AlertElement.propTypes = {
    agreeAction: PropTypes.func,
    textMessage: PropTypes.string,
};

AlertElement.defaultProps = {
    textMessage: '',
    agreeAction: undefined,
};


export default memo(AlertElement);