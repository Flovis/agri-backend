'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Farmes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Farmes.belongsTo(models.User,{
        foreignKey:"user_id"
      })
      Farmes.belongsTo(models.Organisations,{
        foreignKey:"id_organisation"
      })
    }
  }
  Farmes.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    address: DataTypes.STRING,
    size: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    id_organisation: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Farmes',
  });
  return Farmes;
};