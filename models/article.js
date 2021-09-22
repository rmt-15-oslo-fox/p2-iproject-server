'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Article.hasMany(models.History, {
        foreignKey: 'artikelId'
      })
    }
  };
  Article.init({
    judul: DataTypes.STRING,
    isi: DataTypes.STRING,
    imageUrl_headline: DataTypes.STRING,
    imageUrl_content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};