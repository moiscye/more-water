import axios from "axios";

export const createPaymentIntent = async (items) => {
  try {
    let res = await axios.post(`.netlify/functions/payment`, items, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return Promise.resolve({ ok: true, data: res.data });
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

export const handleOrderError = async (orderData) => {
  try {
    await axios.post(`.netlify/functions/order-email-only`, orderData);
    return Promise.resolve({ ok: true });
  } catch (e) {
    return Promise.resolve({ ok: false, error: e });
  }
};
