'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.School)
      User.hasMany(models.Pledge)
      User.hasMany(models.Transaction)
      // define association here
    }
  }
  User.init({
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
     schoolId: {
      type: DataTypes.INTEGER,
      allowNull:true
     },
    role: {
      type: DataTypes.ENUM("Admin","Moderator","Alumni"),
      defaultValue:"Alumni"
     }
    
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};