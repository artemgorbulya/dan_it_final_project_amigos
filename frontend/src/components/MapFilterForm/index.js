import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Search } from "../Map";
import { feedFilterSelectors } from "../../store/feedFilter";
import { feedListActions } from "../../store/feedList";
import { API_FEED } from "../../constants/api";
import styles from "./MapFilterForm.module.scss";

const MapFilterForm = () => {
    const dispatch = useDispatch();
    const filters = useSelector(feedFilterSelectors.getAll);
    const [prevPlaceId, setPlaceId] = useState(null);

    const getData = placeId => {
        const filter = {...filters, placeId};

        axios.post(`${API_FEED}/map`, filter)
            .then(({ data }) => dispatch(feedListActions.saveMapList(data.data)))
            .catch(error => {
                console.log(error);
                dispatch(feedListActions.saveMapList([]))
            });

        setPlaceId(placeId);
    };

    useEffect(() => {
        getData(prevPlaceId);
    }, [filters]);

    const changeCity = (placeId, latLng) => {
        if (placeId === prevPlaceId || !placeId) {
            return;
        }

        dispatch(feedListActions.saveMapCenter(latLng));
        getData(placeId);
    };

    return <div className={styles['search']}>
        <Search onlyCity={true}
                placeholder='Выберите город'
                callback={({ placeId, lat, lng }) => changeCity(placeId, { lat, lng })}
        />
    </div>
};

export default MapFilterForm;