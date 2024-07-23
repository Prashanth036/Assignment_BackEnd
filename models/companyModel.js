'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Company.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    contactEmail: DataTypes.STRING,
    contactPhone: DataTypes.STRING,
    website: DataTypes.STRING,
    description: DataTypes.TEXT,
    contacted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false // Default value for new records
    }
  }, {
    sequelize,
    modelName: 'Company',
  });
  
  return Company;
};
 