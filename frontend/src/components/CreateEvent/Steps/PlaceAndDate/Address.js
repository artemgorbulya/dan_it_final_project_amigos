import React, {memo, useState, useEffect} from "react";
import PropTypes from "prop-types";
import {useFormikContext} from "formik";
import {getGeocode} from "use-places-autocomplete";
import {Map, Search} from "../../../Map";
import Button from "../../../Button";
import styles from "./PlaceAndDate.module.scss";

const Address = ({ name, placeholder }) => {
    const { values, setFieldValue } = useFormikContext();

    const [showMap, setShowMap] = useState(false);
    const [newValueForce, setNewValue] = useState();
    const [prevCity, setPrevCity] = useState(values.city.city);

    useEffect(() => {
        if (prevCity !== values.city.city) {
            setFieldValue(name,{
                address: '',
                placeId:'',
                latLng: null
            });

            setNewValue('');
            setPrevCity(values.city.city);
        }

    }, [values.city]);

    return (<>
        <label className={styles['form-row']}>
            <i className='icon--map-marker' />

            <Search onlyCity={false}
                className={`${styles['form-row']} address-search`}
                placeholder={placeholder}
                cityIn={values.city}
                initValue={values.address.address}
                callback={({ address, placeId, lat, lng }) => {
                    setNewValue(address);

                    setFieldValue(name,{
                        address,
                        placeId,
                        latLng: { lat, lng }
                    });
                }}
                newValueForce={newValueForce}
            />
        </label>

        {
            showMap &&
            <div className={styles.place__map}>
                <Map
                    bounds={values.city.bounds}
                    latLng={values.address.latLng && values.address.latLng.lat
                        ? values.address.latLng
                        : values.city.latLng || undefined }
                    callback={async (latLng) => {
                        const results = await getGeocode({
                            location: latLng,
                            region: 'ru'
                        });

                        const { geometry, formatted_address: address, place_id: placeId } = results[0];

                        setFieldValue(name, {
                            address,
                            placeId,
                            latLng : {
                                lat: geometry.location.lat(),
                                lng: geometry.location.lng()
                            }
                        });

                        setNewValue(address);
                    }}
                />
            </div>
        }

        <Button
            classList='btn btn--primary'
            action={() => setShowMap(!showMap)}
        >
            { showMap && <span>Скрыть карту</span> }
            { !showMap && <span><i className='icon--search' />Найти место на карте</span> }
        </Button>
    </>);
};

Address.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string
};

Address.defaultProps = {
    name: 'address',
    placeholder: 'Choose an address'
};

export default memo(Address);