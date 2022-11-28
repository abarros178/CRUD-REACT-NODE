const { DataTypes } = require("sequelize");

module.exports = (sequelize, type) => {
  return sequelize.define("profesor", {
    id: {
      type: type.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: type.STRING,
      allowNull: false,
    },
    identificacion: {
      type: type.INTEGER,
      allowNull: false,
    },
    tipo_profesor: {
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
