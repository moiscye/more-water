const mongoose = require("mongoose");
let isConnected = null;
const mongoURI = process.env.MONGO_URI;
module.exports = async () => {
  if (isConnected == null) {
    try {
      let db = await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });

      isConnected = db.connections[0].readyState;
      console.log(`Connected to mongodb...`);
    } catch (err) {
      console.error(err);
    }
  }
};
