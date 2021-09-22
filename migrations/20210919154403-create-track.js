'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tracks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      distance: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      tracking_time: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING
      },
      transport: {
        allowNull: false,
        type: Sequelize.STRING
      },
      jumlahPos: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      MountId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Mountains',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('Tracks');
  }
};