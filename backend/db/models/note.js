'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    user_id: DataTypes.INTEGER,
    notebook_id: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {});
  Note.associate = function(models) {
    Note.belongsTo(models.User, {foreignKey: "user_id"})
    Note.belongsTo(models.Notebook, {foreignKey: "notebook_id"})
  };
  return Note;
};