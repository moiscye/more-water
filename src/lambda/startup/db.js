const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
let isConnected = null;
const mongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://enrique:89mZlSl96gD2on1z@cluster0-secqt.mongodb.net/morewaterDB?retryWrites=true&w=majority";
module.exports = async () => {
  if (isConnected == null) {
    try {
      let db = await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
      autoIncrement.initialize(db);
      isConnected = db.connections[0].readyState;
      console.log(`Connected to mongodb...`);
    } catch (err) {
      console.error(err);
    }
  }
};
