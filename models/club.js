'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Club extends Model {
    static associate(models) {
      // define association here
      Club.belongsToMany(models.User, { through: 'Bookmark', foreignKey: 'UserId' })
    }
  };
  Club.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Name cant be empty' },
            notNull: { msg: 'Name cant be empty' }
        }
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Image cant be empty' },
            notNull: { msg: 'Image cant be empty' }
        }
    },
    stadion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Stadion cant be empty' },
            notNull: { msg: 'Stadion cant be empty' }
        }
    }
  }, {
    sequelize,
    modelName: 'Club',
  });
  return Club;
};