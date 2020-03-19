'use strict';

const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
    const Permission = sequelize.define('permission', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING
        },
    }, {
        hooks: {
            beforeCreate: permission => {
                permission.id = uuid();
            }
        }
    });
    Permission.associate = function (models) {
        Permission.belongsToMany(models.user, {
            through: 'user_permissions',
            as: 'users',
            foreignKey: 'permissionid'
        });
    };
    return Permission;
};