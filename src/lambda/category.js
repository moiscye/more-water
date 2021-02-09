const { Category } = require("./models/category");
const connectToDB = require("./startup/db");

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await connectToDB();
  if (event.httpMethod == "POST") {
    let body = event.body ? JSON.parse(event.body) : {};
    let response;
    if (body) {
      try {
        let category = await Category.insertMany(body.categories);
        response = {
          statusCode: 200,
          body: JSON.stringify(category),
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
