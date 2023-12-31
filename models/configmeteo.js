'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConfigMeteo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association her
      ConfigMeteo.belongsTo(models.User, {
        foreignKey:"UserId"
      })
      ConfigMeteo.belongsTo(models.Contents, {
        foreignKey:"ContentId"
      })
      ConfigMeteo.belongsTo(models.Products, {
        foreignKey:"ProductId"
      })
      ConfigMeteo.belongsTo(models.Cycles, {
        foreignKey:"CycleId"
      })
      
    }
  }
  ConfigMeteo.init({
    UserId: DataTypes.INTEGER,
    ContentId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    CycleId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    canal: DataTypes.STRING,
    condition: DataTypes.STRING,
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ConfigMeteo',
  });
  return ConfigMeteo;
};