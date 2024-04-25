const getLocCity = state => state.map.locCity;
const getLocCityPlaceId = state => state.map.locCityPlaceId;
const getLocBounds = state => state.map.locBounds;
const getLocLatLng = state => state.map.locLatLng;

export default {
    getLocCity,
    getLocCityPlaceId,
    getLocBounds,
    getLocLatLng
};