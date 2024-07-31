'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class CreatorForm extends Model {
    static associate(models) {
      // Define associations here
      CreatorForm.hasMany(models.Partnership, { foreignKey: 'creatorId' });
      CreatorForm.belongsTo(models.Creator, { foreignKey: 'creatorAccountId' });
      CreatorForm.belongsTo(models.Employee, { foreignKey: 'employeeId' });
    }
  }

  CreatorForm.init({
    creatorId: { // Define as auto-incrementing primary key
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Employees', // Ensure this matches the name used in migrations
        key: 'employeeId'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    creatorAccountId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Creators', // Ensure this matches the name used in migrations
        key: 'creatorAccountId'
      },
      validate: {
        isInt: { msg: 'Business Account ID must be an integer' },
      }
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
