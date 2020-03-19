const { api_key, network } = require('./secret');
const CryptoApis = require('cryptoapis.io');

const caClient = new CryptoApis(api_key).BC.BTC;
caClient.switchNetwork(network);

module.exports = caClient;
