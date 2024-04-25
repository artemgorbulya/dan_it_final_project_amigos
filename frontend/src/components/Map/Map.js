import React, { useState, useEffect, useCallback, useRef } from "react";
import {GoogleMap, Marker} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { mapSelectors } from "../../store/map";
import mapStyles from "./mapStyles";

const mapContainerStyle = {
    width: '100%',
    height: '100%'
};

const options = {
    styles: mapStyles, // https://snazzymaps.com/
    disableDefaultUI: true, // disable default UI,
    zoomControl: true,
}

const Map = ({ bounds, latLng, callback }) => {
    const locLatLng = useSelector(mapSelectors.getLocLatLng);
    const center = latLng ? latLng : locLatLng;
    const [marker, setMarker] = useState(undefined);
    const mapBounds = useRef(bounds);
    const mapRef = useRef(null);

    useEffect(() => {
        setMarker(center);
    }, [center]);

    useEffect(() => {
        mapBounds.current = bounds;

        if (mapRef.current) {
            mapRef.current.setZoom(12);
        }
    }, [bounds]);

    const panTo = useCallback(latLng => {
        mapRef.current.panTo(latLng);
        mapRef.current.setZoom(14);
    }, []);

    const moveTo = useCallback(latLng => {
        if (mapBounds.current && !mapBounds.current.contains(latLng)) {
            return;
        }

        callback(latLng);
        panTo(latLng);
        setMarker(latLng);
    }, []);

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    return (<GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={marker}
        options={options}
        onLoad={onMapLoad}
    >
        {marker && <Marker
            position={marker}
            draggable={true}
            onDragEnd={(event) => {
                moveTo({ lat: event.latLng.lat() , lng: event.latLng.lng() })
            }}
        />}
    </GoogleMap>);
};

Map.propTypes = {
    bounds: PropTypes.object,
    latLng: PropTypes.object,
    callback: PropTypes.func
};

Map.defaultProps = {
    callback: () => {}
}

export default Map;