import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover} from "@reach/combobox";
import React, { useState, memo, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { mapSelectors } from "../../store/map";
import { langSelectors } from "../../store/lang";
import {COUNTRY, PLACEHOLDER} from "../../constants/map";

import "@reach/combobox/styles.css";

const Search = ({ onlyCity, className, placeholder, cityIn, required, initValue, callback, newValueForce }) => {
    const locCity = useSelector(mapSelectors.getLocCity);
    const locCityPlaceId = useSelector(mapSelectors.getLocCityPlaceId);
    const lang = useSelector(langSelectors.getLangAbbr);
    const [selectValue, setSelectValue] = useState(initValue);
    const dataDependency = onlyCity ? [selectValue, locCityPlaceId] : [selectValue];

    useEffect(() => {
        if (initValue) {
            setValue(initValue, false);
        }
    }, []);

    useEffect(async () => {
        await getData();
    }, dataDependency);

    useEffect(() => {
        if (!onlyCity && value !== newValueForce) {
            setValue(newValueForce, false);
        }
    }, [newValueForce]);

    const {
        ready, // is set up and ready to go, are all scripts loaded
        value, // current value the user is typing in the search box
        suggestions: { status, data}, // suggestions getting back from Google API
        setValue,
        clearSuggestions
    } = usePlacesAutocomplete({
        requestOptions: {
            types: onlyCity ? ['(cities)'] : ['address'],
            bounds: cityIn && cityIn.bounds ? cityIn.bounds : null,
            componentRestrictions: {
                country: COUNTRY
            }
        }
    });

    const getData = async () => {
        if (!selectValue) {
            if (!onlyCity) {
                callback({
                    address: '',
                    placeId: '',
                    lat: null,
                    lng: null
                });
                return;
            }

            if (!locCityPlaceId) {
                return;
            }
        }

        // updating state and place whatever they chosen in there without going to Google and fetching new data
        try {
            const geocodeQuery = selectValue
                ? { address: selectValue }
                : { placeId: locCityPlaceId };

            if (!selectValue && onlyCity && required) {
                setValue(locCity, false);
                setSelectValue(locCity);
                return;
            }

            if (initValue === selectValue) {
                return;
            }

            const results = await getGeocode(geocodeQuery);
            const { lat, lng } = await getLatLng(results[0]);
            const { place_id: placeId, geometry } = results[0];

            callback({ address: selectValue, lat, lng, placeId, bounds: geometry.bounds });
        } catch (error) {
            console.log(error);
            callback({
                address: '',
                placeId: '',
                lat: null,
                lng: null
            });
        }
    };

    const onSelectValue = address => {
        setValue(onlyCity ? address.split(',')[0] : address, false);
        setSelectValue(address);
        clearSuggestions();
    };

    const onBlur = target => {
        const address = target.value;
        const oldAddress = onlyCity
            ? selectValue.split(',')[0]
            : selectValue;

        if (address !== oldAddress || !address) {
            if (required) {
                target.focus();
            } else if (address === oldAddress) {
                callback({
                    address: '',
                    placeId: '',
                    lat: null,
                    lng: null
                });
            } else {
                setSelectValue('');
            }
        }
    }

    return (
        <>
            <Combobox
                onSelect={ address => {
                    onSelectValue(address);
                }}
                className={className}
                onBlur={e => onBlur(e.target)}
            >
                <ComboboxInput
                    value={value}
                    onChange={e => {
                        setValue(e.target.value);
                    }}
                    disabled={!ready}
                    placeholder={placeholder ? placeholder : PLACEHOLDER[lang]}
                    selectOnClick
                    type='text'
                />

                {!!data.length && <ComboboxPopover className={className}>
                    <ComboboxList>
                        {status === "OK" &&
                        data.map(
                            ({ place_id, description }) => <ComboboxOption key={place_id} value={description} />
                        )}
                    </ComboboxList>
                </ComboboxPopover>}
            </Combobox>
        </>
    )
};

Search.propTypes = {
    onlyCity: PropTypes.bool,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    cityIn: PropTypes.object,
    required: PropTypes.bool,
    callback: PropTypes.func,
    initValue: PropTypes.string,
    newValueForce: PropTypes.string,
};

Search.defaultProps = {
    onlyCity: false,
    className: '',
    cityIn: null,
    required: false,
    callback: () => {},
    initValue: '',
    newValueForce: ''
};

export default memo(Search);