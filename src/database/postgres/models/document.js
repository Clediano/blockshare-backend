'use strict';

const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('document', {
    oidarchive: DataTypes.STRING,
  },
    {
      hooks: {
        beforeCreate: async document => {
          document.id = uuid();
        }
      }
    }
  );
  Document.associate = function (models) {

    Document.hasOne(models.transaction, {
      foreignKey: 'documentid',
      as: 'transaction'
    });

    Document.belongsTo(models.organization, {
      foreignKey: 'organizationid',
      as: 'organization'
    });
  };
  return Document;
};