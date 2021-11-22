'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Movie.init({
    title: {
      type : DataTypes.STRING,
      validate : {
        notEmpty: { msg: "Title is required"},
        notNull: { msg: "Title is required"}
      }
    },
    synopsis: {
      type : DataTypes.TEXT,
      validate : {
        notEmpty: { msg: "Synopsis is required"},
        notNull: { msg: "Synopsis is required"}
      }
    },
    trailerUrl: {
      type : DataTypes.STRING
    },
    imgUrl: {
      type : DataTypes.STRING
    },
    rating: {
      type : DataTypes.INTEGER,
      validate : {
        min : 1
      }
    },
    genreId: {
      type : DataTypes.INTEGER
    },
    authorId: {
      type : DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};