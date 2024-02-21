const mongoose = require("mongoose");

const connect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongo DB connected", connect.connection.host);
  } catch (err) {
    console.log("Some error occurred while connecting with mongo", err);
  }
};

module.exports = connect;
