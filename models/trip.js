'use strict';
const {
  Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Trip.belongsToMany(models.User, {through: 'GroupTrip'})
      // Trip.belongsTo(models.GroupTrip, {foreignKey: 'TripId'})
      Trip.belongsTo(models.Mountain, {foreignKey: 'MountId'})
      Trip.belongsTo(models.Track, {foreignKey: 'TrackId'})
      Trip.belongsToMany(models.User, {through: 'GroupTrips'})
    }
  };
  Trip.init({
    MountId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    TrackId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    start_date: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
    end_date: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
    status: {
      type: DataTypes.BOOLEAN
    }
  }, {
    hooks: {
      beforeCreate: (trip) => {
        trip.status = true
      }
    },
    sequelize,
    modelName: 'Trip',
  });
  return Trip;
};