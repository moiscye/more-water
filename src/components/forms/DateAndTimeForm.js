import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { useDispatch, useSelector } from "react-redux";
import { ADD_FECHA_ENTREGA } from "store/actions/cartAction";
import FormContainer from "./FormContainer";
import { Column } from "../misc/Layouts";
import DateP from "react-date-picker";
import { formatDate } from "helpers/formatDate";

const DatePicker = styled(DateP).attrs((props) => ({
  className: props.className,
}))`
  & .react-calendar {
    ${tw`transform translate-y-1/2 sm:translate-y-0`}
  }
`;

export default ({ clearError }) => {
  const dispatch = useDispatch();
  const { deliveryDate } = useSelector((state) => ({
    ...state.cartReducer,
  }));
  const [startDate, setStartDate] = useState();
  useEffect(() => {
    if (deliveryDate) setStartDate(new Date(deliveryDate));
  }, [deliveryDate]);

  const handleDateChange = (date) => {
    dispatch({ type: ADD_FECHA_ENTREGA, payload: new Date(date) });
  };

  return (
    <FormContainer>
      <Column onClick={clearError}>
        <h2>Fecha de entrega:</h2>
        <p>{startDate && formatDate(startDate)}</p>

        <DatePicker
          onChange={handleDateChange}
          //minDate={new Date()}
          value={startDate}
          clearIcon={null}
          className="react-calendar"
          locale="es"
        />
      </Column>
    </FormContainer>
  );
};
