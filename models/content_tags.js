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
      Content_Tags.belongsTo(models.Contents, {
        foreignKey: "content_id"
      })
      Content_Tags.belongsTo(models.Tags, {
        foreignKey: "tag_id"
      })
    }
  }
  Content_Tags.init({
    content_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Content_Tags',
  });
  return Content_Tags;
};