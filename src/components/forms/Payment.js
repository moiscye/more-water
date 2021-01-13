import React from "react";
import { useSelector } from "react-redux";
import FormContainer from "./FormContainer";
import SingleColumnTable from "../tables/SingleColumnTable";
import { ButtonContainer, SubmitButton } from "../misc/Buttons";
import { Column, PriceContainer } from "../misc/Layouts";
import { PriceTag } from "../misc/Headings";
import formatDate from "helpers/formatDate";

export default (props) => {
  let {
    user,
    pipa,
    manguera,
    extras,
    fechaEntrega,
    address,
    total,
  } = useSelector((state) => ({
    ...state.authReducer,
    ...state.addressReducer,
    ...state.cartReducer,
  }));

  const detallePedido = [
    {
      leftText: "Direccion de entrega",
      rightText: address,
    },
    {
      leftText: "Fecha de Entrega",
      rightText: formatDate(fechaEntrega),
    },
    {
      leftText: "Servicio",
      rightText: pipa.name,
    },
    {
      leftText: "Cantidad de manguera",
      rightText: manguera.name,
    },
    {
      leftText: "Lavado de Tinaco",
      rightText: extras.cisterna.status ? "Si" : "No",
    },
    {
      leftText: "Lavado de Cisterna",
      rightText: extras.cisterna.status ? "Si" : "No",
    },
    {
      leftText: "Instrucciones",
      rightText: user && user.message,
    },
  ];
  const detalleContacto = [
    {
      leftText: "Nombre",
      rightText: user && user.fullName,
    },
    {
      leftText: "Telefono",
      rightText: user && user.phoneNumber,
    },
    {
      leftText: "Email",
      rightText: user && user.email,
    },
  ];

  const detallePago = [
    {
      leftText: "Cuenta",
      rightText: "Num cuenta",
    },
    {
      leftText: "Clabe",
      rightText: "Num calbe",
    },
    {
      leftText: "Beneficiario",
      rightText: "beneficiario",
    },
    {
      leftText: "Instrucciones",
      rightText: `Una vez realizado tu deposito, envianos una copia o fotografía de tu comprobante por alguno de los siguientes medios: email: pipasangelopolis@gmail.com o al numero 222-436-2510`,
    },
  ];

  const handleSubmit = () => {};

  return (
    <FormContainer>
      <Column>
        <h2>Confirma tu Compra</h2>
        <SingleColumnTable
          tableTitle="Detalles de tu pedido"
          rows={detallePedido}
        />
        <SingleColumnTable
          tableTitle="Datos de Contacto"
          rows={detalleContacto}
        />
        <SingleColumnTable
          tableTitle="Datos para realizar tu pago"
          rows={detallePago}
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
            Hacer Pedido
          </SubmitButton>
        </ButtonContainer>
      </Column>
    </FormContainer>
  );
};
