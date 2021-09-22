"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Payments", "status", {
      type: Sequelize.STRING,
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Payments", "status", {});
  },
};
