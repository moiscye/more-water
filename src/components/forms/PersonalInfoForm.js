import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import FormContainer from "./FormContainer";
import { ButtonContainer, SubmitButton } from "../misc/Buttons";
import { Column, PriceContainer } from "../misc/Layouts";
import { PriceTag } from "../misc/Headings";
import { ErrorMessage } from "../misc/Errors";
import { ADD_USER } from "store/actions/authAction";

const initialState = {
  fullName: "",
  phoneNumber: "",
  email: "",
  message: "",
};

//const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`;
const In = tw.input`py-2 mt-4 w-full p-4 rounded-md  border border-solid  bg-white text-black text-xl focus:outline-none  `;
const Input = styled(In)((props) => [
  props.error
    ? tw`border-red-300 focus:border-red-900`
    : tw`border-gray-300 focus:border-primary-600`,
]);

const Textarea = styled(Input).attrs({ as: "textarea" })`
  ${tw`h-24`}
`;

export default (props) => {
  const dispatch = useDispatch();
  let { user, total } = useSelector((state) => ({
    ...state.authReducer,
    ...state.cartReducer,
  }));
  const [contactDetails, setContactDetails] = useState();
  const [error, setError] = useState(false);
  let { fullName, phoneNumber, email, message } =
    contactDetails || initialState;

  useEffect(() => {
    if (user) setContactDetails(user);
    // eslint-disable-next-line
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChange = (e) => {
    var data = { ...contactDetails };
    data[e.target.name] = e.target.value;
    setContactDetails(data);
    setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      setError(true);
      scrollToTop();
      return;
    }
    dispatch({ type: ADD_USER, payload: contactDetails });
    props.nextStep();
  };

  const validateFields = () => {
    return fullName && phoneNumber && email;
  };
  return (
    <FormContainer>
      <Column>
        <h2>Informacion Personal</h2>
        {error && (
          <ErrorMessage>Nombre, Telefono e Email son requeridos</ErrorMessage>
        )}

        <Input
          onChange={handleChange}
          type="text"
          name="fullName"
          placeholder={"Nombre Completo"}
          error={error}
          value={fullName}
        />
        <Input
          onChange={handleChange}
          type="text"
          name="phoneNumber"
          placeholder={"Telefono"}
          error={error}
          value={phoneNumber}
        />
        <Input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Email"
          error={error}
          value={email}
        />

        <Textarea
          onChange={handleChange}
          name="message"
          placeholder={"Instrucciones de Entrega"}
          value={message}
        />
      </Column>
      {total && (
        <PriceContainer>
          <PriceTag>Total: ${total}</PriceTag>
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
