require('dotenv').config();

const config = {
  mongoURI: process.env.MONGO_URI_PROD,
  mySecretJwt: process.env.JWT_SECRET_PROD,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
};

module.exports = config;
