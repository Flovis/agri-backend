'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.User_Roles);
      User.hasMany(models.Farmes);
      User.hasMany(models.Contents);
      User.hasOne(models.Localisation); 
      User.hasMany(models.PlanProduction);


      User.belongsTo(models.Organisations, {
        foreignKey:"id_organisation"
      })


    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    gender: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    adress: DataTypes.STRING,
    state_province: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    profile_picture: DataTypes.STRING,
    account_status: DataTypes.STRING,
    last_login_time: DataTypes.DATE,
    id_organisation: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};