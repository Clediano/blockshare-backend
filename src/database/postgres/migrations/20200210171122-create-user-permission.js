'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('user_permissions', {
            userid: {
                type: Sequelize.UUID,
                primaryKey: true,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            permissionid: {
                type: Sequelize.UUID,
                primaryKey: true,
                references: {
                    model: 'permissions',
                    key: 'id'
                }
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
        return queryInterface.dropTable('user_permissions');
    }
};