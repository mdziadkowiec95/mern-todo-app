const mongoose = require("mongoose");
const config = require("config");
const mongoURI = config.mongoURI;

const connectDB = async () => {
  try {
    console.log(mongoURI);

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    console.log("Mongo DB connected with SUCCESS!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
