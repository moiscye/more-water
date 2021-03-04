var express = require("express");
var bodyParser = require("body-parser");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

async function getItem(keyId) {
  const params = {
    TableName: process.env.API_MOREWATER_PRODUCTTABLE_NAME,
    /* Item properties will depend on your application concerns */
    Key: {
      id: keyId,
    },
  };

  try {
    const data = await docClient.get(params).promise();
    return data;
  } catch (err) {
    return err;
  }
}

/****************************
 *  post method *
 ****************************/

app.post("/payment", async function (req, res) {
  let { amount, items } = req.body;
  let response;

  try {
    const data = await getItem(items[0].id);
    console.log("DB", data);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "mxn",
    });
    response = {
      statusCode: 200,
      data: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
      }),
    };
  } catch (e) {
    response = {
      statusCode: 500,
      data: JSON.stringify(e),
    };
  }
  res.json(response);
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
