'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mountain extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mountain.hasMany(models.Track, {foreignKey: 'MountId'})
      Mountain.hasMany(models.Trip, {foreignKey: 'MountId'})
    }
  };
  Mountain.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    height: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        min: 1000
      }
    },
    status: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: true
      }
    },
    lokasi: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    imageUrl: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Mountain',
  });
  return Mountain;
};