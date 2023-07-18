'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Pledges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      projectId: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      paid:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('Pledges');
  }
};