import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LocationSearchInput from "./LocationSearchInput";
import SimpleMap from "./SimpleMap";
import FormContainer from "./FormContainer";
import { Column } from "../misc/Layouts";
import { ErrorMessage } from "../misc/Errors";
import { EMPTY } from "store/actions/addressAction";

export default ({ error }) => {
  const [showError, setShowError] = useState(error);
  let { address } = useSelector((state) => ({
    ...state.addressReducer,
    ...state.cartReducer,
  }));
  const dispatch = useDispatch();
  const errorMessage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return <ErrorMessage>Ingrese la direccion de entrega</ErrorMessage>;
  };

  const handleClick = () => {
    setShowError(false);
  };
  return (
    <FormContainer>
      <Column onClick={handleClick}>
        <h2>Cual es la direccion de entrega?</h2>
        {showError && errorMessage()}
        {address && <p>{address}</p>}
        <LocationSearchInput />
      </Column>
      <Column>
        <SimpleMap />
      </Column>
      <button type="button" onClick={() => dispatch({ type: EMPTY })}>
        Limpiar
      </button>
    </FormContainer>
  );
};
