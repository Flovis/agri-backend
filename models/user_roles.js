"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User_Roles extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User_Roles.belongsTo(models.User, {
                foreignKey: "UserId",
            });
            User_Roles.belongsTo(models.Roles, {
                foreignKey: "RoleId",
            });
        }
    }
    User_Roles.init(
        {
            UserId: DataTypes.INTEGER,
            RoleId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "User_Roles",
        }
    );
    return User_Roles;
};
