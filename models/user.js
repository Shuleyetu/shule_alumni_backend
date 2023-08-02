'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Gallery)
      User.belongsTo(models.School)
      User.hasMany(models.Pledge,{
        onDelete:'CASCADE',
        hooks: true
      })
      User.hasMany(models.Transaction,{
        onDelete:'CASCADE',
        hooks: true
      })
      User.hasMany(models.Pledge,{
        onDelete:'CASCADE',
        hooks: true
      })
      User.hasMany(models.Transaction,{
        onDelete:'CASCADE',
        hooks: true
      })
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
     achievement: {
      type: DataTypes.TEXT,
      allowNull:true
     },
     bio: {
      type: DataTypes.TEXT,
      allowNull:true
     },
     position: {
      type: DataTypes.STRING,
      allowNull:true
     },
     company: {
      type: DataTypes.STRING,
      allowNull:true
     },
     address: {
      type: DataTypes.STRING,
      allowNull:true
     },
     birth_date: {
      type: DataTypes.DATE,
      allowNull:true
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