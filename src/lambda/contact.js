const sgMail = require("@sendgrid/mail");
const contactEmail = require("./emailTemplates/contactEmail");
exports.handler = async (event) => {
  const sendGridKey = process.env.SEND_GRID_KEY;

  const sendEmail = async (body) => {
    const { fullName, email } = body;
    sgMail.setApiKey(sendGridKey);

    const msg = {
      to: "moiscye@gmail.com",
      from: "info@angelopolis.com.au",
      subject: `Mensaje de ${fullName}`,
      text: "message field",
      html: contactEmail(body),
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
    console.log(body);
    let response;
    if (body) {
      try {
        body = await sendEmail(body);
        response = {
          statusCode: 200,
          body: JSON.stringify(body),
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
  if (event.httpMethod == "GET") {
    let response = {
      statusCode: 200,
      body: "is getting",
    };

    return response;
  }
};
