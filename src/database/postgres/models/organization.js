'use strict';

const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
    const Organization = sequelize.define('organization', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM,
            values: ['FISICA', 'JURIDICA'],
            allowNull: false,
            validate: {
                isIn: [['FISICA', 'JURIDICA']]
            }
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cnpj: {
            type: DataTypes.STRING,
            allowNull: true
        },
        oidphoto: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            },
            set(email) {
                this.setDataValue('email', email.toString().toLowerCase());
            }
        },
    }, {
        hooks: {
            beforeCreate: organization => {
                organization.id = uuid();
            }
        }
    });
    Organization.associate = function (models) {

        Organization.hasMany(models.document, {
            foreignKey: 'organizationid',
            as: 'documents'
        });

        Organization.hasOne(models.wallet, {
            foreignKey: 'organizationid',
            as: 'wallet'
        });

        Organization.hasMany(models.user, {
            foreignKey: 'organizationid',
            as: 'users'
        });

    };
    return Organization;
};