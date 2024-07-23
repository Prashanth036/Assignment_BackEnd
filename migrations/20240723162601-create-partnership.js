'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Partnerships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      businessId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Businesses', // Name of the target model
          key: 'id' // Key in the target model
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      creatorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Creators',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      partnershipType: {
        type: Sequelize.ENUM('Equity', 'Collaboration', 'Funding'),
        allowNull: false
      },
      equityShare: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      collaborationDetails: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fundingAmount: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      startDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Active', 'Completed', 'Terminated'),
        defaultValue: 'Pending'
      },
      terms: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      notes: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Partnerships');
  }
};
