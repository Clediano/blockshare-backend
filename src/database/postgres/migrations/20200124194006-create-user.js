'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            name: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            organizationid: {
                type: Sequelize.UUID,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: 'organizations',
                    key: 'id'
                }
            },
            password: {
                type: Sequelize.STRING
            },
            oidphoto: {
                type: Sequelize.STRING
            },
            leader: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            passwordresettoken: {
                type: Sequelize.STRING
            },
            passwordresetexpired: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    }
};