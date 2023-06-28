'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Roles.hasOne(models.User_Roles)
      Roles.belongsTo(models.Organisations,{
        foreignKey:"id_organisation"
      })
    }
  }
  Roles.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    type: DataTypes.STRING,
    id_organisation: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Roles',
  });
  return Roles;
};