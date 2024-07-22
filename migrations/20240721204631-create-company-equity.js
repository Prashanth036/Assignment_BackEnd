'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('CompanyEquities', 'founderName', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('CompanyEquities', 'employeeName', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('CompanyEquities', 'contactPhone', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('CompanyEquities', 'address', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('CompanyEquities', 'website', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('CompanyEquities', 'establishedYear', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('CompanyEquities', 'founderName');
    await queryInterface.removeColumn('CompanyEquities', 'employeeName');
    await queryInterface.removeColumn('CompanyEquities', 'contactPhone');
    await queryInterface.removeColumn('CompanyEquities', 'address');
    await queryInterface.removeColumn('CompanyEquities', 'website');
    await queryInterface.removeColumn('CompanyEquities', 'establishedYear');
  }
};
