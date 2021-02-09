const connectToDB = require("./startup/db");
const { Product } = require("./models/product");
require("./models/category");
exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await connectToDB();
  if (event.httpMethod == "POST") {
    let body = event.body ? JSON.parse(event.body) : {};
    let response;
    if (body) {
      try {
        let product = await Product.insertMany(body.products);
        response = {
          statusCode: 200,
          body: JSON.stringify(product),
        };
      } catch (e) {
        console.log(e);
        response = {
          statusCode: 500,
          body: JSON.stringify(e),
        };
      }
    }
    return response;
  } else if (event.httpMethod == "GET") {
    let response;
    try {
      let products = await Product.find()
        .populate("category")
        .sort([["price", "asc"]])
        .exec();
      response = {
        statusCode: 200,
        body: JSON.stringify(products),
      };
    } catch (e) {
      console.log(e);
      response = {
        statusCode: 500,
        body: JSON.stringify(e),
      };
    }
    return response;
  }
};
