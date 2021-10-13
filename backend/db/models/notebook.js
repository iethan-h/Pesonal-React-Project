'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    user_id:{
     type: DataTypes.INTEGER,
      references: { model: "Users" },
    },
    title: DataTypes.STRING(255)
  }, {});
  Notebook.associate = function(models) {
    Notebook.belongsTo(models.User, {foreignKey: "user_id"})
    Notebook.hasMany(models.Note, {foreignKey: "notebook_id"})
  };
  return Notebook;
};