'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favourite.belongsTo(models.User, {foreignKey: "userId"})
    }
  };
  Favourite.init({
    userId: DataTypes.STRING,
    locationId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    lat: DataTypes.INTEGER,
    long: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    address: DataTypes.STRING,
    rating: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Favourite',
  });
  return Favourite;
};