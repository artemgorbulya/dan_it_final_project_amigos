import types from "./types";

const setLocCity = (city) => ({
    type: types.SET_LOC_CITY,
    payload: city
});

const setLocCityPlaceId = (placeId) => ({
    type: types.SET_LOC_CITY_PLACE_ID,
    payload: placeId
});

const setLocBounds = (bounds) => ({
    type: types.SET_LOC_BOUNDS,
    payload: bounds
});

const setLocLatLng = (latLng) => ({
    type: types.SET_LOC_LAT_LNG,
    payload: latLng
});

export default {
    setLocCity,
    setLocCityPlaceId,
    setLocBounds,
    setLocLatLng
}