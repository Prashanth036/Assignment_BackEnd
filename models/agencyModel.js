// models/agency.cjs
'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  class Agency extends Model {
    static associate(models) {
      // Define associations here if needed
      Agency.hasMany(models.Employee, {
        foreignKey: 'agencyId',
      });
      
    }
  }

  Agency.init({
    agencyId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    agencyName: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('agencyName', value.trim());
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('location', value.trim());
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      set(value) {
        this.setDataValue('description', value ? value.trim() : null);
      }
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('contactEmail', value.trim());
      }
    },
    contactPhone: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('contactPhone', value.trim());
      }
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        this.setDataValue('website', value ? value.trim() : null);
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('email', value.trim());
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Agency',
    hooks: {
      beforeCreate: async (agency) => {
        if (agency.password) {
          const salt = await bcrypt.genSalt(10);
          agency.password = await bcrypt.hash(agency.password, salt);
        }
      },
      beforeUpdate: async (agency) => {
        if (agency.password) {
          const salt = await bcrypt.genSalt(10);
          agency.password = await bcrypt.hash(agency.password, salt);
        }
      }
    }
  });

  return Agency;
};
