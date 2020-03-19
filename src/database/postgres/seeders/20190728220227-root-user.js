'use strict';

const Crypto = require('../../../helpers/crypto');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [{
            id: '77745c5b-cb89-41b5-bc42-d25c39a89268',
            name: 'Clediano Estefenon',
            email: 'cledianoestefenon@gmail.com',
            password: Crypto.hash("123"),
            oidphoto: '',
            organizationid: '611dbd62-8ba4-498c-8447-f733c89c31ff',
            passwordresettoken: '',
            passwordresetexpired: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('organizations', null, {});
    }
};
