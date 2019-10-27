const mongoose = require('mongoose');
const config = require('config');
const mongoURIdev = config.mongoURIdev;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURIdev, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    console.log('Mongo DB connected with SUCCESS!');
  } catch (error) {
    console.log(error.message);

    process.exit(1);
  }
};

module.exports = connectDB;
