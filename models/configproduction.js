'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConfigProduction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ConfigProduction.belongsTo(models.Contents, {
        foreignKey:  "ContentId"
      })

      ConfigProduction.belongsTo(models.Products, {
        foreignKey:  "ProductId"
      })

      ConfigProduction.belongsTo(models.Cycles, {
        foreignKey:  "CycleId"
      })
    }
  }
  ConfigProduction.init({
    ContentId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    CycleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ConfigProduction',
  });
  return ConfigProduction;
};