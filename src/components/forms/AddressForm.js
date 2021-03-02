import React from "react";
import { useSelector } from "react-redux";
import LocationSearchInput from "./LocationSearchInput";
import SimpleMap from "./SimpleMap";
import FormContainer from "./FormContainer";
import { Column } from "../misc/Layouts";

export default ({ clearError }) => {
  let { address } = useSelector((state) => ({
    ...state.addressReducer,
    ...state.cartReducer,
  }));

  return (
    <FormContainer>
      <Column onClick={clearError}>
        <h2>Cual es la direccion de entrega?</h2>
        {address && <p>{address}</p>}
        <LocationSearchInput />
      </Column>
      <Column>
        <SimpleMap />
      </Column>
    </FormContainer>
  );
};
