'use strict';

const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define('friend', {
    match: {
      type: DataTypes.BOOLEAN
    },
  },
    {
      hooks: {
        beforeCreate: async friend => {
          friend.id = uuid();
        }
      }
    }
  );
  Friend.associate = function (models) {

    Friend.belongsTo(models.organization, {
      foreignKey: 'interestedid',
      as: 'interested'
    });

    Friend.belongsTo(models.organization, {
      foreignKey: 'invitedid',
      as: 'invited'
    });

  };
  return Friend;
};