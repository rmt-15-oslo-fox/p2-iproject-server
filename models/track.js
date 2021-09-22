'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Track extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Track.belongsTo(models.Mountain, {foreignKey:'MountId'})
      Track.hasMany(models.Trip, {foreignKey: 'TrackId'})
    }
  };
  Track.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    distance: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        min: 1
      }
    },
    tracking_time: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        min: 1
      }
    },
    location: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    transport: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    jumlahPos: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    MountId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Track',
  });
  return Track;
};