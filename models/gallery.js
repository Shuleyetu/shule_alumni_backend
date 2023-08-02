'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gallery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Gallery.belongsTo(models.User)
    }
  }
  Gallery.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    image: {
      type: DataTypes.STRING,
      allowNull:false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'Gallery',
  });
  return Gallery;
};