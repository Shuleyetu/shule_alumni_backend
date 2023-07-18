'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class School extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      School.hasMany(models.User)
      // define association here
    }
  }
  School.init({
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
    registration_no: {
      type: DataTypes.STRING,
      allowNull:true
    },
    registration_date: {
      type: DataTypes.DATE,
      allowNull:true
    },
   

  }, {
    sequelize,
    modelName: 'School',
  });
  return School;
};