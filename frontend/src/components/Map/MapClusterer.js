import React, { useState, useEffect, useCallback, useRef } from "react";
import  { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { GoogleMap, MarkerClusterer, Marker, InfoWindow } from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import mapStyles from "./mapStyles";
import {userOperations, userSelectors} from "../../store/user";
import {feedListOperations} from "../../store/feedList";
import styles from "./Map.module.scss";
import axios from "axios";
import Button from "../Button";

const mapContainerStyle = {
    width: '100%',
    height: '100%'
};

const options = {
    styles: mapStyles, // https://snazzymaps.com/
    disableDefaultUI: true, // disable default UI,
    zoomControl: true,
};

const MapClusterer = ({ center, mapList }) => {
    const dispatch = useDispatch();
    const userId = useSelector(userSelectors.getUserId);
    const [selected, setSelected] = useState(null);
    const mapRef = useRef(null);

    const subscribeToEvent = (eventId) => {
        axios.put( `/api/events/${eventId}/subscribe`)
            .then(function (response) {
                setSelected({...selected, showBtn: false});
                dispatch(feedListOperations.subscribeEventMap(eventId, userId));
                dispatch(userOperations.subscribeEventOperation(response.data.data));
            })
            .catch(console.log);
    };

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.setZoom(14);
        }
    }, [center]);

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    return (<GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        options={options}
        onLoad={onMapLoad}
    >
        {mapList.map(event => {
                const position = event.address?.latLng
                    ? event.address.latLng
                    : event.city.latLng;

                const location = event.address?.latLng
                    ? event.address.address
                    : event.city.fullAddress;

                const period = !event.dateStart
                    ? 'В любой день'
                    : (event.dateStart > Date.now()
                        ? formatRelative(new Date(event.dateStart), new Date())
                        : formatRelative(new Date(event.dateEnd), new Date())
                    );

                return <Marker
                    key={event._id}
                    position={position}
                    icon={{
                        url: event.category.icon,
                        scaledSize: new window.google.maps.Size(20, 20),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(20, 20)
                    }}
                    onClick={() => {
                        setSelected({
                            id: event._id,
                            position,
                            photo: event.photo,
                            category: event.category.title,
                            description: event.description,
                            location,
                            period,
                            showBtn: !event.applicants.includes(userId) && !event.membersAllowed.includes(userId)
                        })
                    }}
                />
            })
        }

        {selected &&
            <InfoWindow
                position={selected.position}
                onCloseClick={() => setSelected(null)}
            >
                <div className={styles['info-window']}>
                    <div className={styles['info-window__block']}>
                        <div className={styles['info-window__avatar']}>
                            <img src={selected.photo} alt=""/>
                        </div>
                        <div className={styles['info-window__content']}>
                            <h4 className={styles['info-window__name']}>{selected.category}</h4>
                            <p className={styles['info-window__details']}>{selected.description}</p>
                            <p className={styles['info-window__location']}>{selected.location}</p>
                        </div>
                        {selected.showBtn && <div className={styles['info-window__agree']}>
                            <Button classList='info-window__btn'
                                    action={() => subscribeToEvent(selected.id)}
                            >
                                Пойти
                            </Button>
                        </div>}
                        <div className={styles['info-window__period']}>
                            {selected.period}
                        </div>
                    </div>
                </div>
            </InfoWindow>}
    </GoogleMap>);
};

MapClusterer.propTypes = {
    center: PropTypes.object.isRequired,
    mapList: PropTypes.array.isRequired
};

MapClusterer.defaultProps = {
    center: {
        lat: 50.450001,
        lng: 30.523333
    },
    mapList: []
};

export default MapClusterer;