import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import axios from "axios";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "./FormContainer";
import { ErrorMessage } from "../misc/Errors";
import SingleColumnTable from "../tables/SingleColumnTable";
import { ButtonContainer, SubmitButton } from "../misc/Buttons";
import { Column, PriceContainer, ColumnStackable } from "../misc/Layouts";
import { PriceTag } from "../misc/Headings";
import formatDate from "helpers/formatDate";
import { SET_SUCCESS } from "store/actions/cartAction";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "helpers/paymentUtils";
import conektaLogo from "images/conekta.jpg";
import ccLogo from "images/cc.jpg";

const In = tw.input`p-2 w-full rounded-md border border-solid  bg-white text-black text-base focus:outline-none  `;
const Input = styled(In)((props) => [
  props.error
    ? tw`border-red-300 focus:border-red-900`
    : tw`border-gray-300 focus:border-primary-600`,
]);

const Cell = tw.div`mt-2 self-center`;
const InputContainer = tw(Cell)`mt-5 mx-2 md:mt-0`;
const CardContainer = tw.div`mt-5 md:mt-0`;
const TableContainer = tw.div`bg-white shadow-md rounded my-6 text-xl`;
const Table = tw.table` table-auto text-left border-collapse `;
const Th = tw.th`py-4 px-2 bg-gray-100 font-bold text-2xl text-gray-800 border-b border-gray-400 `;
const Td = tw.td`py-4 px-2  border-b border-gray-400`;

//6,2
export default (props) => {
  const dispatch = useDispatch();
  const [isSending, setIsSending] = useState(false);

  const [error, setError] = useState(false);

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
      leftText: "Banco",
      rightText: "Santander",
    },
    {
      leftText: "Num. de Cuenta",
      rightText: "60573554647",
    },
    {
      leftText: "Clabe Interbancaria",
      rightText: "014650605735546476",
    },
    {
      leftText: "Sucursal",
      rightText: "4501 Plaza San Angel",
    },
    {
      leftText: "Beneficiario",
      rightText: "Jose Juan Librado Martinez Medel",
    },
    {
      leftText: "Instrucciones",
      rightText: `Una vez realizado tu deposito, envianos una copia o fotografía de tu comprobante por alguno de los siguientes medios: email: pipasangelopolis @gmail.com o al numero 222-436-2510`,
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
    let totalBeforeDelivery = cartList.reduce((sum, item) => {
      return sum + item.price;
    }, 0);

    cartList.push({
      name: "Costo de Entrega",
      price: total - totalBeforeDelivery,
    });
    return cartList;
  };

  // const handleChange = (e) => {
  //   var data = { ...paymentDetails };
  //   data[e.target.name] = e.target.value;
  //   setPaymentDetails(data);
  //   setError(false);
  // };
  // const validateFields = () => {
  //   return fullName && cardNumber;
  // };
  const [focus, setFocus] = useState("");
  const [cardInfo, setCardInfo] = useState({
    cvc: "",
    expiry: "",
    name: "",
    number: "",
  });

  const handleInputFocus = (e) => {
    setFocus(e.target.name);
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    console.log("outside", value);
    if (name === "number") {
      value = formatCreditCardNumber(value);
    } else if (name === "expiry") {
      value = formatExpirationDate(value);
    } else if (name === "cvc") {
      value = formatCVC(value);
    }
    console.log("after card", value);
    const data = { ...cardInfo };
    data[name] = value;
    setCardInfo(data);
  };

  const handleSubmit = async () => {
    setIsSending(true);
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
      setIsSending(false);
      dispatch({ type: SET_SUCCESS, payload: true });
    } else if (res.status === 500) {
      setIsSending(false);
      console.error("error");
    }
  };
  const priceSection = () =>
    total && (
      <PriceContainer>
        <PriceTag>
          Total: ${total && Number.parseFloat(total).toFixed(2)}
        </PriceTag>
      </PriceContainer>
    );
  const buttonSection = () => (
    <Column>
      <ButtonContainer>
        <SubmitButton
          type="button"
          value="Submit"
          onClick={props.previousStep}
          disabled={isSending}
        >
          Atras
        </SubmitButton>

        <SubmitButton
          disabled={isSending}
          type="button"
          value="Submit"
          onClick={handleSubmit}
        >
          {isSending ? "Procesando Pedido..." : "Pagar"}
        </SubmitButton>
      </ButtonContainer>
    </Column>
  );
  const reviewOrderTable = () => (
    <Column>
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
  );

  const paymentForm = () => (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <Th>Pagar en Linea</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td>
              <ColumnStackable>
                <div>
                  <span>Pagos Seguros con</span>

                  <img
                    css={tw`inline w-24 `}
                    src={conektaLogo}
                    alt="Logo de Conekta"
                  />
                </div>
                <div css={tw`mt-4 md:mt-0`}>
                  <span>Aceptamos todas las tarjetas de credito y debito</span>
                  <img
                    src={ccLogo}
                    css={tw`inline w-24`}
                    alt="Logo de tarjetas de debito y credito"
                  />
                </div>
              </ColumnStackable>
            </Td>
          </tr>

          <tr>
            <Td>
              <ColumnStackable inverted>
                <InputContainer>
                  <Cell>
                    <Input
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      type="text"
                      name="name"
                      required
                      placeholder={"Titular de la tarjeta"}
                      value={cardInfo.name}
                      error={error}
                    />
                  </Cell>
                  <Cell>
                    <Input
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      type="tel"
                      name="number"
                      pattern="[\d| ]{16,22}"
                      required
                      placeholder={"Numero de Tarjeta"}
                      value={cardInfo.number}
                      error={error}
                    />
                  </Cell>

                  <ColumnStackable disabled>
                    <Cell>
                      <Input
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        type="tel"
                        name="expiry"
                        pattern="\d\d/\d\d"
                        required
                        placeholder={"Expiracion"}
                        value={cardInfo.expiry}
                        error={error}
                      />
                    </Cell>
                    <Cell>
                      <Input
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        type="tel"
                        name="cvc"
                        pattern="\d{3,4}"
                        required
                        placeholder={"CVV"}
                        value={cardInfo.cvc}
                        error={error}
                      />
                    </Cell>
                  </ColumnStackable>
                </InputContainer>
                <CardContainer>
                  <Cards
                    cvc={cardInfo.cvc}
                    expiry={cardInfo.expiry}
                    focused={focus}
                    name={cardInfo.name}
                    number={cardInfo.number}
                  />
                </CardContainer>
              </ColumnStackable>
            </Td>
          </tr>
        </tbody>
      </Table>
    </TableContainer>
  );

  const errorSection = () =>
    error && (
      <ErrorMessage>
        Nombre, Numero de Tarjeta y Fecha de Vencimiento son requeridos
      </ErrorMessage>
    );
  //integrate Column instead <>
  return (
    <FormContainer>
      <h2>Confirma tu Compra</h2>
      {reviewOrderTable()}
      {paymentForm()}
      {priceSection()}
      {errorSection()}
      {buttonSection()}
    </FormContainer>
  );
};
