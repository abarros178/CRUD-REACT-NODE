const { DataTypes } = require("sequelize");

module.exports = (sequelize, type) => {
  return sequelize.define("valorparametro", {
    id: {
      type: type.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: type.STRING,
      allowNull: false,
    },
    descripcion: {
      type: type.STRING,
      allowNull: true,
    },
    codigo: {
      type: type.STRING,
      allowNull: false,
    },
    estado: {
      type: type.STRING,
      allowNull: false,
      defaultValue: "1",
    },
  });
};
