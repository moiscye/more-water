import { ADD_ADDRESS, EMPTY, UPDATE_DISTANCE } from "../actions/addressAction";

const initialState = {
  address: null,
  latLng: { origin: { lat: 19.0041185, lng: -98.2450492 }, destination: null },
  distance: 0,
  zoom: 12,
  distancePrice: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ADDRESS:
      let { latLng } = initialState;
      latLng.destination = payload.latLng.destination;
      return {
        ...state,
        address: payload.address,
        latLng,
      };
    case UPDATE_DISTANCE:
      return {
        ...state,
        distance: payload.distance,
        distancePrice: payload.distancePrice,
      };
    case EMPTY:
      return { ...state, ...initialState };
    default:
      return state;
  }
};
