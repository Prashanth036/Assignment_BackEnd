'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Creators', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      contact: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      services: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      skills: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      portfolioLink: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isUrl: true
        }
      },
      offerType: {
        type: Sequelize.ENUM('equity', 'funding', 'idea'),
        allowNull: false
      },
      equityPercentage: {
        type: Sequelize.FLOAT,
        allowNull: true,
        validate: {
          min: 0,
          max: 100
        }
      },
      fundingAmount: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      ideaDescription: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Creators');
  }
};
