import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import FormContainer from "./FormContainer";
import { Column } from "../misc/Layouts";
import { ADD_USER } from "store/actions/authAction";
import { useDidMount } from "helpers/useDidMount";

const initialState = {
  fullName: "",
  phoneNumber: "",
  email: "",
  message: "",
};

const In = tw.input`py-2 mt-4 w-full p-4 rounded-md  border border-solid  bg-white text-black text-xl focus:outline-none  `;
const Input = styled(In)((props) => [
  props.error
    ? tw`border-red-300 focus:border-red-900`
    : tw`border-gray-300 focus:border-primary-600`,
]);

const Textarea = styled(Input).attrs({ as: "textarea" })`
  ${tw`h-24`}
`;

export default ({ clearError }) => {
  const dispatch = useDispatch();
  const didMount = useDidMount();
  let { user } = useSelector((state) => ({
    ...state.authReducer,
    ...state.cartReducer,
  }));
  const [contactDetails, setContactDetails] = useState();
  let { fullName, phoneNumber, email, message } =
    contactDetails || initialState;

  useEffect(() => {
    if (user) setContactDetails(user);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (didMount) dispatch({ type: ADD_USER, payload: contactDetails });
    // eslint-disable-next-line
  }, [contactDetails]);

  const handleChange = (e) => {
    var data = { ...contactDetails };
    data[e.target.name] = e.target.value;
    setContactDetails(data);
    clearError();
  };

  return (
    <FormContainer>
      <Column>
        <h2>Informacion Personal</h2>

        <Input
          onChange={handleChange}
          type="text"
          name="fullName"
          placeholder={"Nombre Completo"}
          value={fullName}
        />
        <Input
          onChange={handleChange}
          type="text"
          name="phoneNumber"
          placeholder={"Telefono"}
          value={phoneNumber}
        />
        <Input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Email"
          value={email}
        />

        <Textarea
          onChange={handleChange}
          name="message"
          placeholder={"Instrucciones de Entrega"}
          value={message}
        />
      </Column>
    </FormContainer>
  );
};
