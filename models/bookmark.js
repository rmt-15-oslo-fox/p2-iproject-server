'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    static associate(models) {
      // define association here
      Bookmark.belongsTo(models.User, { foreignKey: 'UserId' })
      Bookmark.belongsTo(models.Club, { foreignKey: 'ClubId' })
    }
  };
  Bookmark.init({
    UserId: DataTypes.INTEGER,
    ClubId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bookmark',
  });
  return Bookmark;
};