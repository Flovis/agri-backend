"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Content_Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Content_Category.hasMany(models.Contents);
            Content_Category.hasMany(models.Configs);
        }
    }
    Content_Category.init(
        {
            category_name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Content_Category",
        }
    );
    return Content_Category;
};
