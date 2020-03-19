'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('user_permissions', [
            {
                userid: '77745c5b-cb89-41b5-bc42-d25c39a89268',
                permissionid: '97c5fe24-63f8-4a51-b0fa-04bcc504e97f',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userid: '77745c5b-cb89-41b5-bc42-d25c39a89268',
                permissionid: 'd473433a-2d3d-4d86-ace0-1cd82b24c26f',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userid: '77745c5b-cb89-41b5-bc42-d25c39a89268',
                permissionid: 'e2fb5b7b-dac9-4d77-af28-2b2dcb9d55b6',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userid: '77745c5b-cb89-41b5-bc42-d25c39a89268',
                permissionid: '9735a5a4-f280-44f4-b623-320308e7ebab',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('user_permissions', null, {});
    }
};
