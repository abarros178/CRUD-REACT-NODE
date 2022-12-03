const { DataTypes } = require("sequelize");

module.exports = (sequelize, type) => {
  return sequelize.define("materia_estudiante", {
    id: {
      type: type.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    id_materia: {
      type: type.BIGINT,
      allowNull: false,
    },
    id_estudiante: {
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
