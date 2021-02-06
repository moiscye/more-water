import React, { useMemo, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
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
  const myRef = useRef(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [clientName, setClientName] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
  let { total } = useSelector((state) => ({
    ...state.cartReducer,
  }));

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    createPaymentIntent();
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
    console.log(res.data.deliveryChargeSuccess);
  };

  const handleChange = (e) => {
    setError(false);
    setClientName(e.target.value);
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
    const cardElement = elements.getElement(CardNumberElement);

    let payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: { name: clientName },
      },
    });
    if (payload.error) {
      setError(payload.error.message);
      setProcessing(false);
      console.log("[error]", payload.error);
    } else {
      setProcessing(false);
      setIsPaymentCompleted(true);
      setClientName("");
      console.log("payment success", payload);
      //saving order in db
      let res = await axios.post(`.netlify/functions/orders`, orderData);
      if (res.status === 200) {
        console.log("payment success", res.data);
      } else if (res.status === 500) {
        console.error("error", res);
      }
    }
  };

  const errorSection = () => {
    //window.scrollTo(0, myRef.current.offsetTop);
    tableRef.current.scrollIntoView({ behavior: "smooth" });
    //scroll code
    return <ErrorMessage>{error}</ErrorMessage>;
  };

  return (
    <section ref={myRef}>
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
        <SubmitButton type="button" value="Submit" onClick={previousStep}>
          Atras
        </SubmitButton>
        <SubmitButton disabled={processing || !stripe} onClick={handleSubmit}>
          Pagar
        </SubmitButton>
      </ButtonContainer>
    </section>
  );
};
