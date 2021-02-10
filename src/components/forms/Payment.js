import React, { useMemo, useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ButtonContainer, SubmitButton } from "../misc/Buttons";
import { PriceContainer } from "../misc/Layouts";
import { ErrorMessage } from "../misc/Errors";
import { PriceTag } from "../misc/Headings";
import useResponsiveFontSize from "helpers/useResponsiveFontSize";
import { SET_SUCCESS } from "store/actions/cartAction";

const cssCardElements = tw`p-4 mb-6 w-full rounded-md border border-solid  bg-white text-black text-base focus:outline-none border-gray-300 focus:border-primary-600`;

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily:
            "system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#ff0033",
        },
      },
    }),
    [fontSize]
  );

  return options;
};

export default ({ previousStep, orderData, tableRef }) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const dispatch = useDispatch();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [clientName, setClientName] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  let { total } = useSelector((state) => ({
    ...state.cartReducer,
  }));

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    createPaymentIntent();
    // eslint-disable-next-line
  }, []);

  const createPaymentIntent = async () => {
    let res = await axios.post(
      `.netlify/functions/payment`,
      { items: orderData.order.products },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setClientSecret(res.data.clientSecret);
    //check whether the delivery fee has been added here res.data.deliveryChargeSuccess
  };

  const handleChange = (e) => {
    setError(false);
    setClientName(e.target.value);
  };
  const createPaymentDetails = (paymentResult) => {
    return {
      paymentHolderName: clientName,
      transactionId: paymentResult.paymentIntent.id
        ? paymentResult.paymentIntent.id
        : null,
      paymentType:
        paymentResult.paymentIntent.payment_method_types &&
        paymentResult.paymentIntent.payment_method_types.length > 0
          ? paymentResult.paymentIntent.payment_method_types[0]
          : null,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }
    if (!clientName) {
      setError("Nombre del titular requerido");
      setProcessing(false);
      return;
    }
    let paymentResult;
    try {
      const cardElement = elements.getElement(CardNumberElement);
      paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: clientName },
        },
      });
      if (paymentResult.error) {
        setError(paymentResult.error.message);
        setProcessing(false);
      } else {
        let paymentDetails = createPaymentDetails(paymentResult);
        orderData.order.paymentDetails = paymentDetails;
        //saving order in db
        let res = await axios.post(`.netlify/functions/orders`, orderData);
        if (res.status === 200) {
          // setClientName("");
          //validate if the deliveryfee was charged.
          // setProcessing(false);
          dispatch({ type: SET_SUCCESS, payload: true });
        } else {
          //If payment was completed. Send and email...
          let ress = await handleOrderError();
          if (ress.success) {
            dispatch({ type: SET_SUCCESS, payload: true });
          } else {
            let message = buildErrorMessage();
            setError(message);
          }
        }
      }
    } catch (e) {
      if (paymentResult && !paymentResult.error) {
        let ress = await handleOrderError();
        if (ress.success) {
          dispatch({ type: SET_SUCCESS, payload: true });
        } else {
          let message = buildErrorMessage();
          setError(message);
        }
      } else {
        setError(
          "Hubo un problema con el pago. Intenta mas tarde o llamanos al 222-436-2510"
        );
        setProcessing(false);
      }
    }
  };
  const buildErrorMessage = () => {
    return (
      "Tu pago ha sido exitoso pero hubo un problema al procesar la order. Por favor ten a la mano esta clave: " +
      orderData.order.paymentDetails.transactionId +
      ". Llamanos al 222-436-2510 para darte una solucion. Agradecemos tu  preferencia. Si refrescas la Pagina se hara otra orden nueva y por consiguiente otro cargo."
    );
  };

  const handleOrderError = async () => {
    try {
      let res = await axios.post(
        `.netlify/functions/order-email-only`,
        orderData
      );
      if (res.status === 200) return Promise.resolve({ success: true });
    } catch (e) {
      return Promise.resolve({ success: false, error: e });
    }
  };
  const errorSection = () => {
    tableRef.current.scrollIntoView({ behavior: "smooth" });
    return <ErrorMessage>{error}</ErrorMessage>;
  };

  return (
    <>
      {error && errorSection()}
      <label>
        Nombre del Titular*
        <input
          css={cssCardElements}
          options={options}
          onChange={handleChange}
          placeholder="Nombre Completo"
        />
      </label>
      <label>
        Numero de Tarjeta*
        <CardNumberElement
          css={cssCardElements}
          options={options}
          onChange={() => setError(false)}
        />
      </label>
      <label>
        Fecha de expiracion*
        <CardExpiryElement
          css={cssCardElements}
          options={options}
          onChange={() => setError(false)}
        />
      </label>
      <label>
        CVC*
        <CardCvcElement
          css={cssCardElements}
          options={options}
          onChange={() => setError(false)}
        />
      </label>
      <PriceContainer border={false}>
        <PriceTag>
          Total: ${total && Number.parseFloat(total).toFixed(2)}
        </PriceTag>
      </PriceContainer>

      <ButtonContainer>
        <SubmitButton
          disabled={processing || !stripe}
          type="button"
          value="Submit"
          onClick={previousStep}
        >
          Atras
        </SubmitButton>
        <SubmitButton disabled={processing || !stripe} onClick={handleSubmit}>
          {!processing ? "Pagar" : "Procesando..."}
        </SubmitButton>
      </ButtonContainer>
    </>
  );
};
