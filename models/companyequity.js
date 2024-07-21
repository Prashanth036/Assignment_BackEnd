'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyEquity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CompanyEquity.init({
    businessName: DataTypes.STRING,
    vision: DataTypes.STRING,
    companyValuation: DataTypes.STRING,
    equityPercentage: DataTypes.STRING,
    description: DataTypes.TEXT,
    contactEmail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CompanyEquity',
  });
  return CompanyEquity;
};