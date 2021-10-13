'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING(50)
  }, {});
  Notebook.associate = function(models) {
    Notebook.belongsTo(models.User, {foreignKey: "user_id"})
    Notebook.hasMany(models.Note, {foreignKey: "notebook_id"})
  };
  return Notebook;
};