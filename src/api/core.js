import axios from "axios";
import { API, Auth } from "aws-amplify";
import { listProducts } from "../graphql/queries";

export const createPaymentIntent = async (items) => {
  console.log(items);
  try {
    let res = await API.post(`paymentapi`, "/payment", {
      body: {
        amount: 100,
        items,
      },
    });

    return Promise.resolve({ ok: true, data: JSON.parse(res.data) });
  } catch (e) {
    return Promise.resolve({ ok: false, error: e });
  }
};

export const createOrder = async (orderData) => {
  try {
    await axios.post(`.netlify/functions/orders`, orderData);
    return Promise.resolve({ ok: true, data: true });
  } catch (e) {
    return Promise.resolve({ ok: false, error: e });
  }
};

export const sendEmailOnly = async (orderData) => {
  try {
    await axios.post(`.netlify/functions/order-email-only`, orderData);
    return Promise.resolve({ ok: true });
  } catch (e) {
    return Promise.resolve({ ok: false, error: e });
  }
};

export const sendContactEmail = async (contactDetails) => {
  try {
    let res = await axios.post(`.netlify/functions/contact`, contactDetails);
    return Promise.resolve({ ok: true, data: res.data });
  } catch (e) {
    return Promise.resolve({ ok: false, error: e });
  }
};

export const getProducts = async () => {
  try {
    let owner = await Auth.currentAuthenticatedUser().catch(() => false);
    let res = await API.graphql({
      query: listProducts,
      authMode: owner ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
    });
    return Promise.resolve({ ok: true, data: res.data.listProducts.items });
  } catch (e) {
    return Promise.resolve({ ok: false, error: e });
  }
};
