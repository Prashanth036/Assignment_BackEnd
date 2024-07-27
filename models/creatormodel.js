// models/creator.cjs
'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  class Creator extends Model {
    static associate(models) {
      // Define associations here if needed
      Creator.hasOne(models.CreatorForm, { foreignKey: 'creatorAccountId' });
      Creator.hasOne(models.Partnership, { foreignKey: 'creatorAccountId' });

    }
  }

  Creator.init({
    creatorAccountId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true, // Set this as the primary key
      allowNull: false,
      unique: {
        msg: 'Business Account ID already exists'
      },
      validate: {
        isInt: { msg: 'Business Account ID must be an integer' },
        notNull: { msg: 'Business Account ID is required' }
      }
    },
    creatorName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Creator name already exists'
      },
      validate: {
        notNull: {
          msg: 'Creator name is required'
        },
        len: {
          args: [3, 50],
          msg: 'Creator name length must be between 3 and 50 characters'
        }
      },
      set(value) {
        this.setDataValue('creatorName', value.trim()); // Trim whitespace
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
    // Add other creator-specific fields
  }, {
    sequelize,
    modelName: 'Creator',
    hooks: {
      beforeCreate: async (creator) => {
        if (creator.password) {
          const salt = await bcrypt.genSalt(10);
          creator.password = await bcrypt.hash(creator.password, salt);
        }
      },
      beforeUpdate: async (creator) => {
        if (creator.password) {
          const salt = await bcrypt.genSalt(10);
          creator.password = await bcrypt.hash(creator.password, salt);
        }
      }
    }
  });

  return Creator;
};
