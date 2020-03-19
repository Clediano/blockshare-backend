'use strict';

const uuid = require('uuid/v4');
const Crypto = require('../../../helpers/crypto');

module.exports = (sequelize, DataTypes) => {
    const Wallet = sequelize.define('wallet', {
        publickey: {
            type: DataTypes.STRING,
            allowNull: false
        },
        privatekey: {
            type: DataTypes.STRING(512),
            allowNull: false
        },
        wif: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        organizationid: {
            type: DataTypes.UUID,
            references: {
                model: 'organizations',
                key: 'id'
            }
        },
    },
        {
            hooks: {
                beforeCreate: wallet => {
                    wallet.id = uuid();
                    wallet.privatekey = Crypto.encript(wallet.getDataValue('privatekey'))
                },
                beforeUpdate: wallet => {
                    wallet.privatekey = Crypto.encript(wallet.getDataValue('privatekey'))
                }
            }
        }
    );
    Wallet.associate = function (models) {
        Wallet.belongsTo(models.organization, {
            foreignKey: 'organizationid'
        });
    };
    return Wallet;
};