const sgMail = require("@sendgrid/mail");
const contactEmail = require("./services/emailTemplates/contactEmail");
const ContactData = require("./models/contactData");
const connectToDB = require("./startup/db");
exports.handler = async (event, context) => {
  const sendGridKey = process.env.SEND_GRID_KEY;
  context.callbackWaitsForEmptyEventLoop = false;
  await connectToDB();
  const sendEmail = async (body) => {
    const { subject } = body;
    sgMail.setApiKey(sendGridKey);

    const msg = {
      to: process.env.ADMIN_EMAIL_RECIPIENT,
      from: process.env.ADMIN_EMAIL_SENDER,
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
    console.log("ADMIN_EMAIL_RECIPIENT", process.env.ADMIN_EMAIL_RECIPIENT);
    console.log("ADMIN_EMAIL_SENDER", process.env.ADMIN_EMAIL_SENDER);
    console.log("SEND_GRID_KEY", process.env.SEND_GRID_KEY);
    console.log("MONGO_URI", process.env.MONGO_URI);
    console.log("==========================================================");
    console.log(
      "STAGING_ADMIN_EMAIL_RECIPIENT",
      process.env.STAGING_ADMIN_EMAIL_RECIPIENT
    );
    console.log(
      "STAGING_ADMIN_EMAIL_SENDER",
      process.env.STAGING_ADMIN_EMAIL_SENDER
    );
    console.log("STAGING_SEND_GRID_KEY", process.env.STAGING_SEND_GRID_KEY);
    console.log("STAGING_MONGO_URI", process.env.STAGING_MONGO_URI);
    console.log("==========================================================");
    console.log(context);

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
