const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT,
  
  api_key:  process.env.CRYPTO_API_KEY,
  network: process.env.NETWORK,
  
  auth_key: process.env.AUTH_SECRET,

  mail_host: process.env.MAIL_HOST,
  mail_user: process.env.MAIL_USER,
  mail_pass: process.env.MAIL_PASS,
  mail_port: process.env.MAIL_PORT,

  base_url_frontend: process.env.BASE_URL_FRONTEND,

  mongo_connection: process.env.MONGO_CONNECTION,
};
