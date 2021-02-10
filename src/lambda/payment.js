const { Product } = require("./models/product");
const connectToDB = require("./startup/db");

exports.handler = async (event, context) => {
  const MAX_DELIVERY_PRICE = 150; // in 'mxn'
  context.callbackWaitsForEmptyEventLoop = false;
  await connectToDB();
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  //  Calculate the order total on the server to prevent
  //  people from directly manipulating the amount on the client.
  const calculateOrderAmount = async (order) => {
    let idkeys = order.filter((el) => el._id).map((el) => el._id);
    //delivery cost vary. So we dont have an id with price in the server
    //Find it from the list of products sent from the client
    let deliveryIndex = order.findIndex((el) => el.name === "Costo de Entrega");
    let deliveryPrice;
    if (deliveryIndex < 0) {
      //negative index means that the delivery was not included. Hence set a fixed deliveryPrice
      deliveryPrice = -1;
    } else {
      //The maximum price of delivery that the company currently serves
      //If it is over that price, set deliveryPrice to -1
      deliveryPrice =
        order[deliveryIndex].price < MAX_DELIVERY_PRICE
          ? order[deliveryIndex].price
          : -1;
    }

    let products = await Product.find({
      _id: { $in: idkeys },
    });
    let total = products.reduce((acc, el) => {
      return acc + el.price;
    }, 0);
    //deliveryPrice < than 0 we set it to 0
    total = total + (deliveryPrice >= 0 ? deliveryPrice : 0);

    return {
      //Total is multiply by 100. Stripe receives only the amount of cents to be charged
      total: total * 100,
      //deliveryCharge will be sent to the client to alert whether the delivery has been successfully charged
      deliveryChargeSuccess: deliveryPrice === -1 ? false : true,
    };
  };

  if (event.httpMethod == "POST") {
    let body = event.body ? JSON.parse(event.body) : {};
    //deliveryCharge possible values true or false.  Whether the delivery charge was successful

    let response;
    if (body) {
      try {
        let { total, deliveryChargeSuccess } = await calculateOrderAmount(
          body.items
        );
        const paymentIntent = await stripe.paymentIntents.create({
          amount: 1500,
          currency: "mxn",
        });

        response = {
          statusCode: 200,
          body: JSON.stringify({
            clientSecret: paymentIntent.client_secret,
            deliveryChargeSuccess,
          }),
        };
      } catch (e) {
        response = {
          statusCode: 500,
          body: JSON.stringify(e),
        };
      }
    }
    return response;
  }
};
