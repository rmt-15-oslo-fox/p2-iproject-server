'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cocktail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cocktail.belongsToMany(models.User, 
        {
          through : 'Tag',
        }
      )
    }
  };
  Cocktail.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    glass: DataTypes.STRING,
    category: DataTypes.STRING,
    image: DataTypes.STRING,
    video: DataTypes.STRING,
    instruction: DataTypes.STRING,
    ingredient: DataTypes.STRING,
    measurement: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cocktail',
  });
  return Cocktail;
};