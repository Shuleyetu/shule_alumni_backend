'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Pledge)
      Transaction.belongsTo(models.User)

      // define association here
    }
  }
  Transaction.init({
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
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};