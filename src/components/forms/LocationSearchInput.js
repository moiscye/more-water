import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_ADDRESS,
  UPDATE_DISTANCE,
} from "../../store/actions/addressAction";
import { calculateDistancePrice } from "helpers/utils";
const Input = styled.input(() => [
  tw`mt-3 p-4 w-full rounded-md border-solid border border-gray-300 bg-white text-black text-xl focus:outline-none  focus:border-primary-600 z-50`,
]);

const InputContainer = styled.div`
  margin-top: 1.5rem;
`;
export default () => {
  let { address: storedAddress, latLng } = useSelector((state) => ({
    ...state.addressReducer,
    ...state.cartReducer,
  }));

  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (distance !== 0) {
      let distancePrice = calculateDistancePrice(distance);
      dispatch({
        type: UPDATE_DISTANCE,
        payload: { distance, distancePrice },
      });
    }
    // eslint-disable-next-line
  }, [distance]);

  const handleChange = (address) => {
    setAddress(address);
  };

  const getDistance = (destination) => {
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [latLng.origin],
        destinations: [destination],
        travelMode: window.google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.METRIC,
      },
      callback
    );
  };

  function callback(response, status) {
    if (status === "OK") {
      setDistance(response.rows[0].elements[0].distance.value);
    } else {
      console.error("Error: " + status);
    }
  }

  const handleSelect = async (address) => {
    setAddress(address);
    try {
      let res = await geocodeByAddress(address);
      let latLng = await getLatLng(res[0]);
      getDistance(latLng);

      dispatch({
        type: ADD_ADDRESS,
        payload: { address, latLng: { destination: latLng }, distance: 0 },
      });
      setAddress("");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <PlacesAutocomplete
      id="places"
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <InputContainer>
          <Input
            {...getInputProps({
              placeholder: `${
                storedAddress
                  ? "Buscar Otra Direccion o Lugar ..."
                  : "Buscar Direccion o Lugar ..."
              }`,
              className: "location-search-input",
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion, index) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: "#fafafa", cursor: "pointer" }
                : { backgroundColor: "#ffffff", cursor: "pointer" };
              return (
                <div
                  key={index}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span key={index}>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </InputContainer>
      )}
    </PlacesAutocomplete>
  );
};
