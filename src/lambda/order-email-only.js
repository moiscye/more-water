const sgMail = require("@sendgrid/mail");
const orderEmail = require("./services/emailTemplates/orderReceiptEmail");

exports.handler = async (event) => {
  const sendGridKey = process.env.SEND_GRID_KEY;

  const sendEmail = async (body) => {
    sgMail.setApiKey(sendGridKey);
    const msg = {
      to: body.isAdmin ? process.env.ADMIN_EMAIL_RECIPIENT : body.user.email,
      from: {
        email: process.env.ADMIN_EMAIL_SENDER,
        name: body.isAdmin
          ? "Angelopolis: ORDEN PAGADA"
          : "Pipas de Agua Angelopolis",
      },
      subject: body.isAdmin
        ? "Tienes un nuevo pedido. El pago ya ha sido CONFIRMADO pero hubo un problema al guardar la orden."
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
        //sending email to the client
        await sendEmail(body);
        //sending email to the admin
        body.isAdmin = true;
        body.onlyEmail = true;
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
