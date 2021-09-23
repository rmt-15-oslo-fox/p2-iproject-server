'use strict';
const {
    Model
} = require('sequelize');
const {
    encode
} = require('../helpers/bcryptjs.js')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.belongsToMany(models.Club, { through: 'Bookmark', foreignKey: 'UserId' })
    }
  };
  User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Name cant be empty' },
            notNull: { msg: 'Name cant be empty' }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Email cant be empty' },
            notNull: { msg: 'Email cant be empty' }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Password cant be empty' },
            notNull: { msg: 'Password cant be empty' }
        }
    }
  }, {
    hooks: {
        beforeCreate: (user, options) => {
          user.password = encode(user.password)
        }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};