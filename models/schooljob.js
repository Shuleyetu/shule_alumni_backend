'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SchoolJob extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SchoolJob.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull:false
    },
    link: {
      type: DataTypes.STRING,
      allowNull:false
    },
    type: {
      type: DataTypes.ENUM("Full Time","Part Time"),
      allowNull:false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull:false
    },
    image: {
      type: DataTypes.STRING,
      allowNull:false
    },
    schoolId: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'SchoolJob',
  });
  return SchoolJob;
};