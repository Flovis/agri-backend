'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Translated_content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Translated_content.belongsTo(models.Contents, {
        foreignKey:"content_id"

      })
      Translated_content.belongsTo(models.Languages, {
        foreignKey:"id_language"

      })
    }
  }
  Translated_content.init({
    content_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    id_language: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Translated_content',
  });
  return Translated_content;
};