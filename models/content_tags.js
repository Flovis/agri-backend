'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Content_Tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Content_Tags.belongsTo(models.Tags, {
        foreignKey: "TagId"
      })
      Content_Tags.belongsTo(models.Contents, {
        foreignKey: "ContentId"
      })
    }
  }
  Content_Tags.init({

  }, {
    sequelize,
    modelName: 'Content_Tags',
  });
  return Content_Tags;
};