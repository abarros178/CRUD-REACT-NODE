const { DataTypes } = require("sequelize");

module.exports = (sequelize, type) => {
  return sequelize.define("materia", {
    id: {
      type: type.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: type.STRING,
      allowNull: false,
    },
    ubicacion: {
      type: type.STRING,
      allowNull: false,
    },
    profesor_id: {
      type: type.BIGINT,
      allowNull: false,
    },
    estado: {
      type: type.STRING,
      allowNull: false,
      defaultValue: "1",
    },
  });
};
