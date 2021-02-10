import React, { useState, useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { useSelector } from "react-redux";
import FormContainer from "./FormContainer";
import SingleColumnTable from "../tables/SingleColumnTable";
import { Column } from "../misc/Layouts";
import formatDate from "helpers/formatDate";
import stripeLogo from "images/stripe.png";
import Payment from "./Payment";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_CLIENT_KEY, {
  locale: "es",
});

const TableContainer = tw.div`bg-white shadow-md rounded my-6 text-xl`;
const Table = tw.table`w-full table-auto text-left border-collapse `;
const Th = tw.th`py-4 px-2 bg-gray-100 font-bold text-2xl text-gray-800 border-b border-gray-400 `;
const Td = tw.td`py-4 px-2  border-b border-gray-400`;

export default (props) => {
  const [orderData, setOrderData] = useState(null);
  const myRef = useRef(null);
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

  const extrasText = () => {
    let et =
      extras &&
      extras.map((el) => {
        return {
          leftText:
            el.name === "Cisterna" || el.name === "Tinaco"
              ? `Lavado de ${el.name}`
              : el.name,
          rightText: el.status ? "Si" : "No",
        };
      });
    return et;
  };

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
      rightText: pipa && pipa.name,
    },
    {
      leftText: "Cantidad de manguera",
      rightText: manguera && manguera.name,
    },
    ...extrasText(),
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
    cartList =
      extras &&
      extras.reduce((cartList, item) => {
        if (item.status) {
          cartList.push({
            name: item.description,
            price: item.price,
            _id: item._id,
          });
        }
        return cartList;
      }, []);
    cartList.unshift({
      name: manguera.description,
      price: manguera.price,
      _id: manguera._id,
    });
    cartList.unshift({ name: pipa.name, price: pipa.price, _id: pipa._id });
    let totalBeforeDelivery = cartList.reduce((sum, item) => {
      return sum + item.price;
    }, 0);

    cartList.push({
      name: "Costo de Entrega",
      price: total - totalBeforeDelivery,
    });
    return cartList;
  };

  useEffect(() => {
    let order = {
      products: pipa && manguera && extras && filterProducts(),
      transaction_id: "Not Assigned",
      paymentType: "Not Assigned",
      amount: total && total,
      address,
      deliveryDate: new Date(fechaEntrega),
      deliveryInstructions: user && user.message,
    };
    let createUser = {
      email: user && user.email,
      fullName: user && user.fullName,
      phoneNumber: user && user.phoneNumber,
      address,
    };
    setOrderData({ order, user: createUser });

    // eslint-disable-next-line
  }, []);

  const reviewOrderTable = () => {
    return (
      user &&
      pipa &&
      manguera &&
      extras && (
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
      )
    );
  };

  const paymentForm = () => (
    <TableContainer ref={myRef}>
      <Table>
        <thead>
          <tr>
            <Th>
              <span>Pagos en linea con</span>
              <img
                css={tw`inline w-40 md:w-56 my-0 py-0`}
                src={stripeLogo}
                alt="Logo de Stripe"
              />
            </Th>
          </tr>
        </thead>
        {orderData && (
          <tbody>
            <tr>
              <Td>
                <Elements stripe={stripePromise}>
                  <Payment {...props} orderData={orderData} tableRef={myRef} />
                </Elements>
              </Td>
            </tr>
          </tbody>
        )}
      </Table>
    </TableContainer>
  );

  return (
    <FormContainer>
      <h2>Confirma tu Compra</h2>
      {reviewOrderTable()}
      {paymentForm()}
    </FormContainer>
  );
};
