'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pledge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pledge.belongsTo(models.User)
      Pledge.belongsTo(models.Project)
      Pledge.hasOne(models.Transaction)
    }
  }
  Pledge.init({
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
  }, {
    sequelize,
    modelName: 'Pledge',
  });
  return Pledge;
};