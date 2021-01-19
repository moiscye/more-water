const sgMail = require("@sendgrid/mail");
const orderEmail = require("./services/emailTemplates/orderReceiptEmail");
const { Order } = require("./models/order");
const User = require("./models/user");
const connectToDB = require("./startup/db");
exports.handler = async (event, context) => {
  const sendGridKey = process.env.SEND_GRID_KEY;
  context.callbackWaitsForEmptyEventLoop = false;
  await connectToDB();
  const sendEmail = async (body) => {
    sgMail.setApiKey(sendGridKey);

    const msg = {
      to: body.isAdmin ? "moiscye@gmail.com" : body.user.email,
      from: "info@angelopolis.com.au",
      subject: body.isAdmin
        ? "Tienes un nuevo pedido"
        : "Tu pedido esta siendo procesado",
      html: orderEmail(body),
    };

    try {
      await sgMail.send(msg);
      return body;
    } catch (error) {
      if (error.response) {
        console.error(error.response);
        return error.response.body;
      }
    }
  };

  if (event.httpMethod == "POST") {
    let body = event.body ? JSON.parse(event.body) : {};
    let response;
    if (body) {
      try {
        let user = await User.findOne({ email: body.user.email });
        if (!user) {
          user = new User(body.user);
          user = await user.save();
        }
        body.order.user = user._id;
        let order = new Order(body.order);
        order = await order.save();
        body.order.orderNumber = order.orderNumber;
        user.history.push(order._id);
        await user.save();
        //sending email to the client
        await sendEmail(body);
        //sending email to the admin
        body.isAdmin = true;
        await sendEmail(body);
        response = {
          statusCode: 200,
          body: JSON.stringify(body),
        };
      } catch (e) {
        console.error(e);
        response = {
          statusCode: 500,
          body: JSON.stringify(e),
        };
      }
    }
    return response;
  }
};
