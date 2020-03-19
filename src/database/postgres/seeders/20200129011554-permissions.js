'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('permissions', [
            {
                id: '97c5fe24-63f8-4a51-b0fa-04bcc504e97f',
                name: 'VIEW',
                description: 'View record',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 'd473433a-2d3d-4d86-ace0-1cd82b24c26f',
                name: 'INSERT',
                description: 'Insert a new record',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 'e2fb5b7b-dac9-4d77-af28-2b2dcb9d55b6',
                name: 'UPDATE',
                description: 'Update a record',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: '9735a5a4-f280-44f4-b623-320308e7ebab',
                name: 'DELETE',
                description: 'Delete a record',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('permissions', null, {});
    }
};
