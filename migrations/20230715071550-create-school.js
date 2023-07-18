'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Schools', {
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
      image: {
        type: DataTypes.STRING,
        allowNull:false
       },
      name: {
        type: DataTypes.STRING,
        allowNull:false
      },
      email: {
        type: DataTypes.STRING,
        allowNull:false
      },
      phone:{
        type: DataTypes.STRING,
        allowNull:false
      },
      address: {
        type: DataTypes.STRING,
        allowNull:false
      },
      city: {
        type: DataTypes.STRING,
        allowNull:false
      },
      municipal: {
        type: DataTypes.STRING,
        allowNull:false
      },
      type: {
        type: DataTypes.ENUM("Private","Government"),
        allowNull:false
      },
      registration_no: {
        type: DataTypes.STRING,
        allowNull:true
      },
      registration_date: {
        type: DataTypes.DATE,
        allowNull:true
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
    await queryInterface.dropTable('Schools');
  }
};