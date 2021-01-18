import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "./FormContainer";
import SingleColumnTable from "../tables/SingleColumnTable";
import { ButtonContainer, SubmitButton } from "../misc/Buttons";
import { Column, PriceContainer } from "../misc/Layouts";
import { PriceTag } from "../misc/Headings";
import formatDate from "helpers/formatDate";
import { SET_SUCCESS } from "store/actions/cartAction";

export default (props) => {
  const dispatch = useDispatch();
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

  const filterProducts = () => {
    let cartList;
    cartList = Object.values(extras).reduce((cartList, item) => {
      if (item.status) {
        cartList.push({ name: item.description, price: item.price });
      }
      return cartList;
    }, []);
    cartList.unshift({ name: manguera.description, price: manguera.price });
    cartList.unshift({ name: pipa.name, price: pipa.price });
    return cartList;
  };

  const handleSubmit = async () => {
    let order = {
      products: filterProducts(),
      transaction_id: "Not Assigned",
      paymentType: "Not Assigned",
      amount: total,
      address,
      deliveryDate: new Date(fechaEntrega),
      deliveryInstructions: user.message,
    };
    let createUser = {
      email: user.email,
      fullname: user.fullName,
      phoneNumber: user.phoneNumber,
      address,
    };
    let createOrderData = {
      order,
      user: createUser,
    };

    let res = await axios.post(`.netlify/functions/orders`, createOrderData);
    if (res.status === 200) {
      dispatch({ type: SET_SUCCESS, payload: true });

      console.log("success");
    } else if (res.status === 500) {
      console.log("error");
    }
  };

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
            Hacer Pedido
          </SubmitButton>
        </ButtonContainer>
      </Column>
    </FormContainer>
  );
};
