"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Contents extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            Contents.hasOne(models.Configs);
            Contents.hasMany(models.Content_Tags);
            Contents.belongsTo(models.Content_Category, {
                foreignKey: "ContentCategoryId",
            });
            Contents.belongsTo(models.Languages, {
                foreignKey: "LanguageId",
            });
            Contents.belongsTo(models.Cycles, {
                foreignKey: "CycleId",
            });
            Contents.belongsTo(models.Products, {
                foreignKey: "ProductId",
            });
        }
    }
    Contents.init(
        {
            titre: DataTypes.STRING,
            file: DataTypes.STRING,
            link: DataTypes.STRING,
            description: DataTypes.STRING,
            contentText: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "Contents",
        }
    );
    return Contents;
};
