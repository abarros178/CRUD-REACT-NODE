const {sequelize} = require('sequelize')
const {Materia} = require ('./materia')
const {Profesor} = require ('./profesor')
const {Parametro} = require ('./parametro')
const {Valorparametro} = require ('./valorparametro')

// Profesor.hasMany(Materia,{foreingKey: 'profesor_id'})
// Materia.belongsTo(Profesor,{foreingKey: 'profesor_id'})
// Parametro.associate = function ({Valorparametro}) {
//     Account.hasMany(Valorparametro, {
//         onDelete: "cascade"
//     });
// };


// Parametro.hasMany(Valorparametro)
// Valorparametro.belongsTo(Parametro,{foreingKey: 'parametro_id'})





module.exports ={
    Materia,
    Profesor,
    Parametro,
    Valorparametro
}