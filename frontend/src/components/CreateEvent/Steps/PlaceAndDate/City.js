import React, { memo } from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import styles from "./PlaceAndDate.module.scss";
import { Search } from "../../../Map";

const City = ({ name, label, placeholder }) => {
    const { values, setFieldValue } = useFormikContext();

    return (
        <label className={styles['form-row']}>
            <span className={styles['form-row__label']}>{label}</span>

            <Search onlyCity={true}
                className={styles['form-row']}
                placeholder={placeholder}
                required={true}
                initValue={values.city.city}
                callback={({ address, placeId, lat, lng, bounds }) => {
                    setFieldValue(name, {
                        city: address.split(',')[0],
                        fullAddress: address,
                        placeId,
                        latLng: { lat, lng },
                        bounds
                    });
                }}
            />
        </label>
    )
};

City.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string
};

City.defaultProps = {
    name: 'city',
    label: 'Choose a city',
    placeholder: 'Choose a city'
};

export default memo(City);