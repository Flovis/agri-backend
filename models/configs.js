'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Configs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Configs.belongsTo(models.Contents, {
        foreignKey: "idContent",
    });
    }
  }
  Configs.init({
    canal: DataTypes.STRING,
    idContent:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Configs',

  });
  return Configs;
};