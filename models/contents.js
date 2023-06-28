'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contents.belongsTo(models.User, {
        foreignKey:"author_id"

      })
      Contents.belongsTo(models.Content_Category, {
        foreignKey:"category_id"

      })
      Contents.hasMany(models.Content_Tags);
      Contents.hasOne(models.Translated_content);
      Contents.hasMany(models.Audience);


    }
  }
  Contents.init({
    canal: DataTypes.STRING,
    author_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Contents',
  });
  return Contents;
};