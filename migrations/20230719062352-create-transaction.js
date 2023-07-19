'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Transactions', {
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
      pledgeId:{
        type:DataTypes.INTEGER,
        allowNull:true
      },
      userId:{
        type: DataTypes.INTEGER,
        allowNull:true
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      customer_name:{
        type: DataTypes.STRING,
        allowNull:true
      },
      customer_phone:{
        type: DataTypes.STRING,
        allowNull:true
      },
      customer_email:{
        type: DataTypes.STRING,
        allowNull:true
      },
      currency:{
        type: DataTypes.STRING,
        allowNull:true
      },
      payment_type:{
        type: DataTypes.STRING,
        allowNull:true
      },
      status:{
        type: DataTypes.STRING,
        allowNull:true
      },
      card_first_6digits:{
        type: DataTypes.INTEGER,
        allowNull:true
      },
      card_last_4digits:{
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
    await queryInterface.dropTable('Transactions');
  }
};