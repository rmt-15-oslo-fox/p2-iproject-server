'use strict';
const bcrypt = require('bcryptjs')

const {
  Model
} = require('sequelize');
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
      type : DataTypes.STRING
    },    
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Email is required"},
        notNull: { msg: "Email is required"},
        isEmail: { msg: "Must be email format"}
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Password is required"},
        notNull: { msg: "Password is required"},
        len: {
          args: [5, 100],
          msg: "Password min length is 5"
        }       
      }
    },
    role: {
      type : DataTypes.STRING,
      validate: {
        notNull: { msg: 'Role is required' },
        notEmpty: { msg: 'Role is required' }
      }
    },
    phoneNumber: {
      type : DataTypes.STRING,
      validate: {
        notNull: { msg: 'PhoneNumber is required' },
        notEmpty: { msg: 'PhoneNumber is required' }
      }
    },
    address: {
      type : DataTypes.STRING,
      validate: {
        notNull: { msg: 'Address is required' },
        notEmpty: { msg: 'Address is required' }
      }
    },
  }, {

    hooks: {
      beforeCreate: (instance, option) => {
        let salt = bcrypt.genSaltSync(10)
        var hash = bcrypt.hashSync(instance.password, salt)
        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User'
  });
  return User;
};