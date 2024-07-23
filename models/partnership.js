'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Partnership extends Model {
    static associate(models) {
      // Define associations
      Partnership.belongsTo(models.CompanyEquity, { foreignKey: 'businessId' });
      Partnership.belongsTo(models.CreatorForm, { foreignKey: 'creatorId' });
    }
  }

  Partnership.init({
    businessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CompanyEquities', // Ensure this matches the name used in migrations
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CreatorForms', // Ensure this matches the name used in migrations
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    partnershipType: {
      type: DataTypes.ENUM('Equity', 'Collaboration', 'Funding'),
      allowNull: false
    },
    equityShare: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    collaborationDetails: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fundingAmount: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Active', 'Completed', 'Terminated'),
      defaultValue: 'Pending'
    },
    terms: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Partnership',
  });
  Partnership.sync(); // Use cautiously, as it will drop tables

  return Partnership;
};
