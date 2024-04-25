import React, { memo } from "react";
import PropTypes from "prop-types";
import City from "./City";
import Address from "./Address";
import DateBlock from "../../../Form/DateBlock";
import styles from "./PlaceAndDate.module.scss";

const PlaceAndDate = ({ dateField, cityField, addressField }) => (
    <>
        <h3 className={styles.subtitle}>Выберите место и дату:</h3>

        {window.google && <div className={styles.place}>
            <City {...cityField} />
            <Address {...addressField} />
        </div>}

        <DateBlock label={dateField.label}
                   fieldName={dateField.name}
        />
    </>
);

PlaceAndDate.propTypes = {
    cityField: PropTypes.shape({
        name: PropTypes.string,
        label: PropTypes.string,
        placeholder: PropTypes.string
    }),
    addressField: PropTypes.shape({
        name: PropTypes.string,
        label: PropTypes.string,
        placeholder: PropTypes.string
    }),
    dateField: PropTypes.shape({
        name: PropTypes.string,
        label: PropTypes.string
    })
}

export default memo(PlaceAndDate);