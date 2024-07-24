'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class CreatorForm extends Model {
    static associate(models) {
      // Define associations here
      CreatorForm.hasMany(models.Partnership, { foreignKey: 'creatorId' });
    }
  }

  CreatorForm.init({
    creatorId: { // Define as auto-incrementing primary key
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    services: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    skills: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    portfolioLink: {
      type: DataTypes.STRING,
      allowNull: true
      // validate: {
      //   isUrl: true
      // }
    },
    offerType: {
      type: DataTypes.ENUM('equity', 'funding', 'idea'),
      allowNull: false
    },
    equityPercentage: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        max: 100
      }
    },
    fundingAmount: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    ideaDescription: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'CreatorForm',
  });
  return CreatorForm;
};
