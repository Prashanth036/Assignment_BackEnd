'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class CompanyEquity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      CompanyEquity.hasMany(models.Partnership, { foreignKey: 'businessId' });
      CompanyEquity.belongsTo(models.Business, {
        foreignKey: 'businessAccountId',
      });
      CompanyEquity.belongsTo(models.Employee, {
        foreignKey: 'employeeId',
      });
    }
  }

  CompanyEquity.init({
    
    businessId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true, // Set this as the primary key
      allowNull: false,
      unique: true,
      validate: {
        isInt: { msg: 'Business ID must be an integer' },
        notNull: { msg: 'Business ID is required' }
      }
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
    businessAccountId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Businesses', // Ensure this matches the name used in migrations
        key: 'businessAccountId'
      },
      validate: {
        isInt: { msg: 'Business Account ID must be an integer' },
      }
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'Business name is required' },
        len: [3, 50]
      }
    },
    vision: {
      type: DataTypes.STRING,
      allowNull: true
    },
    companyValuation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    equityPercentage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    founderName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    employeeName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contactPhone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true
    },
    establishedYear: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'CompanyEquity',
  });
   
  return CompanyEquity;
};
