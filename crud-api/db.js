const { Sequelize } = require("sequelize");

const MateriaModel = require("./models/materia");
const ProfesorModel = require("./models/profesor");
const ParametroModel = require("./models/parametro");
const ValorParametroModel = require("./models/valorParametro")
const EstudianteModel = require("./models/estudiante");

const sequelize = new Sequelize("materia_crud", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});

const Materia = MateriaModel(sequelize, Sequelize);
const Profesor = ProfesorModel(sequelize, Sequelize);
const Parametro = ParametroModel(sequelize, Sequelize);
const ValorParametro = ValorParametroModel(sequelize, Sequelize);
const Estudiante = EstudianteModel(sequelize, Sequelize);


Parametro.hasMany(ValorParametro,{foreingKey: 'parametro_id'})
ValorParametro.belongsTo(Parametro,{foreingKey: 'parametro_id'})



ValorParametro.hasMany(Profesor,{foreignKey: 'tipo_profesor',as:'tipo_profesor_pk'})
Profesor.belongsTo(ValorParametro,{foreignKey: 'tipo_profesor',as:'tipo_profesor_pk'})

ValorParametro.hasMany(Profesor,{foreignKey: 'gemale',as:'gemale_pk_pro'})
Profesor.belongsTo(ValorParametro,{foreignKey: 'gemale',as:'gemale_pk_pro'})

ValorParametro.hasMany(Estudiante,{foreignKey: 'tipo_identificacion',as:'tipo_identificacion_pk'})
Estudiante.belongsTo(ValorParametro,{foreignKey: 'tipo_identificacion',as:'tipo_identificacion_pk'})

ValorParametro.hasMany(Estudiante,{foreignKey: 'gemale',as:'gemale_pk'})
Estudiante.belongsTo(ValorParametro,{foreignKey: 'gemale',as:'gemale_pk'})



sequelize.sync({ alter: true }).then(() => {
  console.log("Tablas sincronizadas");
});

module.exports = {
    Materia,
    Profesor,
    Parametro,
    ValorParametro,
    Estudiante
}
