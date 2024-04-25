import React from "react";
import { useSelector } from "react-redux";
import { MapClusterer } from "../Map";
import { feedListSelectors } from "../../store/feedList";
import styles from "./MapEvents.module.scss";

const MapEvents = () => {
    const center = useSelector(feedListSelectors.getMapCenter);
    const mapList = useSelector(feedListSelectors.getMapList);

    return(
        <div className={styles.map}>
            {window.google && <MapClusterer
                center={center ? center : undefined}
                mapList={mapList}
            />}
        </div>
    )
};

export default MapEvents;