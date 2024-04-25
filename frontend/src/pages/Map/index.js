import React, { memo } from 'react';
import MapFilterForm from "../../components/MapFilterForm";
import MapEvents from "../../components/MapEvents";
import styles from "./Map.module.scss";

const Map = () => {
    return (<div className={styles.wrapper}>
        <MapFilterForm />
        <MapEvents />
    </div>)
};

export default memo(Map);