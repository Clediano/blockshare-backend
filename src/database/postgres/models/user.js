'use strict';

const Crypto = require('../../../helpers/crypto');
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            },
            set(email) {
                this.setDataValue('email', email.toLowerCase());
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        oidphoto: {
            type: DataTypes.STRING
        },
        leader: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        passwordresettoken: {
            type: DataTypes.STRING
        },
        passwordresetexpired: {
            type: DataTypes.DATE
        },
    }, {
        hooks: {
            beforeCreate: user => {
                user.id = uuid();
                user.password = Crypto.hash(user.getDataValue('password'));
            },
            beforeUpdate: user => {
                user.password = Crypto.hash(user.getDataValue('password'));
            },
        }
    });
    User.associate = function (models) {

        User.hasMany(models.friend, {
            foreignKey: 'interestedid',
            as: 'interested'
        });

        User.hasMany(models.friend, {
            foreignKey: 'invitedid',
            as: 'invited'
        });

        User.belongsTo(models.organization, {
            foreignKey: 'organizationid',
            as: 'organization'
        });

        User.belongsToMany(models.permission, {
            through: 'user_permissions',
            as: 'permissions',
            foreignKey: 'userid'
        });

    };
    return User;
};