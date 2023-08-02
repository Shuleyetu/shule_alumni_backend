'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'achievement', {
      type: Sequelize.TEXT,
      allowNull: true, 
    });
    await queryInterface.addColumn('Users', 'bio', {
      type: Sequelize.TEXT,
      allowNull: true, 
    });
    await queryInterface.addColumn('Users', 'position', {
      type: Sequelize.STRING,
      allowNull: true, 
    });
    await queryInterface.addColumn('Users', 'birth_date', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'company', {
      type: Sequelize.STRING,
      allowNull: true, 
    });
    await queryInterface.addColumn('Users', 'address', {
      type: Sequelize.STRING,
      allowNull: true, 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'achievement');
    await queryInterface.addColumn('Users', 'bio');
    await queryInterface.addColumn('Users', 'birth_date');
    await queryInterface.addColumn('Users', 'company');
    await queryInterface.addColumn('Users', 'position');
    await queryInterface.addColumn('Users', 'address');
  }
};
