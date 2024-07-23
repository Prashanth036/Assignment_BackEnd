// models/business.cjs
'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  class Business extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  Business.init({
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Business name already exists'
      },
      validate: {
        notNull: {
          msg: 'Business name is required'
        },
        len: {
          args: [3, 50],
          msg: 'Business name length must be between 3 and 50 characters'
        }
      },
      set(value) {
        this.setDataValue('businessName', value.trim()); // Trim whitespace
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email already exists'
      },
      validate: {
        notNull: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: 'Must be a valid email address'
        }
      },
      set(value) {
        this.setDataValue('email', value.trim()); // Trim whitespace
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        },
        len: {
          args: [8, 100],
          msg: 'Password must be between 8 and 100 characters'
        }
      }
    },
    // Add other business-specific fields
  }, {
    sequelize,
    modelName: 'Business',
    hooks: {
      beforeCreate: async (business) => {
        if (business.password) {
          const salt = await bcrypt.genSalt(10);
          business.password = await bcrypt.hash(business.password, salt);
        }
      },
      beforeUpdate: async (business) => {
        if (business.password) {
          const salt = await bcrypt.genSalt(10);
          business.password = await bcrypt.hash(business.password, salt);
        }
      }
    }
  });
   Business.sync()
  return Business;
};
