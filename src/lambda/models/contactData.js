const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const contactDataSchema = new Schema({
  email: {
    type: String,
    trim: true,
  },
  fullName: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  subject: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    trim: true,
    maxlength: 300,
  },
});
module.exports = mongoose.model("Contact", contactDataSchema);
