import React, { useState } from "react";
import { useSelector } from "react-redux";
import LocationSearchInput from "./LocationSearchInput";
import SimpleMap from "./SimpleMap";
import FormContainer from "./FormContainer";
import { ButtonContainer, SubmitButton } from "../misc/Buttons";
import { Column, PriceContainer } from "../misc/Layouts";
import { PriceTag } from "../misc/Headings";
import { ErrorMessage } from "../misc/Errors";

export default (props) => {
  const [error, setError] = useState(false);
  let { address, total } = useSelector((state) => ({
    ...state.addressReducer,
    ...state.cartReducer,
  }));
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = () => {
    if (!address) {
      setError(true);
      scrollToTop();
      return;
    }
    props.nextStep();
  };

  const handleClick = () => {
    setError(false);
  };
  //
  return (
    <FormContainer>
      <Column onClick={handleClick}>
        <h2>Cual es la direccion de entrega?</h2>
        {error && <ErrorMessage>Ingrese la direccion de entrega</ErrorMessage>}
        {address && <p>{address}</p>}
        <LocationSearchInput />
      </Column>
      <Column>
        <SimpleMap />
      </Column>
      {total && (
        <PriceContainer>
          <PriceTag>
            Total: ${total && Number.parseFloat(total).toFixed(2)}
          </PriceTag>
        </PriceContainer>
      )}
      <Column>
        <ButtonContainer>
          <SubmitButton
            type="button"
            value="Submit"
            onClick={props.previousStep}
          >
            Atras
          </SubmitButton>

          <SubmitButton type="button" value="Submit" onClick={handleSubmit}>
            Siguiente
          </SubmitButton>
        </ButtonContainer>
      </Column>
    </FormContainer>
  );
};
