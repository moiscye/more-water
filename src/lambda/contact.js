const sgMail = require("@sendgrid/mail");
const contactEmail = require("./services/emailTemplates/contactEmail");
const ContactData = require("./models/contactData");
const connectToDB = require("./startup/db");
exports.handler = async (event, context) => {
  const sendGridKey =
    process.env.SEND_GRID_KEY ||
    "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";
  context.callbackWaitsForEmptyEventLoop = false;
  await connectToDB();
  const sendEmail = async (body) => {
    const { subject } = body;
    sgMail.setApiKey(sendGridKey);

    const msg = {
      to: "moiscye@gmail.com",
      from: "info@angelopolis.com.au",
      subject: subject,
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
        let email = new ContactData(body);
        email = await email.save();
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
};
