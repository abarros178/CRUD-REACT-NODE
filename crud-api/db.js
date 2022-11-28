const { Sequelize } = require("sequelize");

const MateriaModel = require("./models/materia");
const ProfesorModel = require("./models/profesor");
const ParametroModel = require("./models/parametro");
const ValorParametroModel = require("./models/valorParametro")

const sequelize = new Sequelize("materia_crud", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});

const Materia = MateriaModel(sequelize, Sequelize);
const Profesor = ProfesorModel(sequelize, Sequelize);
const Parametro = ParametroModel(sequelize, Sequelize);
const ValorParametro = ValorParametroModel(sequelize, Sequelize);


Parametro.hasMany(ValorParametro,{foreingKey: 'parametro_id'})
ValorParametro.belongsTo(Parametro,{foreingKey: 'parametro_id'})



sequelize.sync({ alter: true }).then(() => {
  console.log("Tablas sincronizadas");
});

module.exports = {
    Materia,
    Profesor,
    Parametro,
    ValorParametro
}
