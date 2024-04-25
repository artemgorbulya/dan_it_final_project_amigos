import types from "./types";

const initialState = {
    locCity: '',
    locCityPlaceId: null,
    locBounds: null,
    locLatLng: undefined
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LOC_CITY:
            return {...state, locCity: action.payload};
        case types.SET_LOC_CITY_PLACE_ID:
            return {...state, locCityPlaceId: action.payload};
        case types.SET_LOC_BOUNDS:
            return {...state, locBounds: action.payload};
        case types.SET_LOC_LAT_LNG:
            return {...state, locLatLng: action.payload}
        default:
            return state;
    }
}