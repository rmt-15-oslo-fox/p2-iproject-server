'use strict';
const {
  Model
} = require('sequelize');
const { hasPass } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull : false
    },
    password: {
     type: DataTypes.STRING,
     allowNull : false,
     validate : {
       notEmpty : {
         args : false,
         msg : 'Password is required'
       }
     }
    },
    city: DataTypes.STRING,
    email : {
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          args : true,
          msg : 'Invalid format email'
        }
      }
    }
  }, {
    hooks : {
      beforeCreate(instance){
        instance.password = hasPass(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};