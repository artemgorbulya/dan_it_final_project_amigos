import actions from "./actions";
import axios from "axios";
import { API_IP } from "../../constants/api";
import { CITY_DEFAULT } from "../../constants/map";

const setLocation = (lang) => dispatch => {
    axios.get(`${API_IP}/?lang=${lang}`)
        .then(({ data }) => {
            let city;

            if (!data.city) {
                city = data.city;
            } else {
                city = data.regionName ? data.regionName.split(" ")[0] : CITY_DEFAULT[lang];
            }

            new window.google.maps.Geocoder().geocode({ address: city}, (results, status) => {
                if (status === "OK") {
                    const { place_id, geometry } = results[0];
                    dispatch(actions.setLocCityPlaceId(place_id));
                    dispatch(actions.setLocLatLng({
                        lat: geometry.location.lat(),
                        lng: geometry.location.lng()
                    }))
                    dispatch(actions.setLocBounds(geometry.bounds));
                }
            });

            dispatch(actions.setLocCity(city));
        });
};

export default {
    setLocation
};