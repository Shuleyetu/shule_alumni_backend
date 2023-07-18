'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Users', {
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
       phone: {
        type: DataTypes.STRING,
        allowNull:false
       },
       password: {
        type: DataTypes.STRING,
        allowNull:false
       },
       graduation_year: {
        type: DataTypes.STRING,
        allowNull:true
       },
      role: {
        type: DataTypes.ENUM("Admin","Moderator","Alumni"),
        defaultValue:"Alumni"
       },
       schoolId: {
        type: DataTypes.INTEGER,
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
    await queryInterface.dropTable('Users');
  }
};