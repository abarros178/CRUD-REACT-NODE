const router = require('express').Router()

const apiMateriaRouter = require('./api/materia')
const apiParametroRouter = require('./api/parametros')
const apiValorParametroRouter = require('./api/valorparametro')
const apiProfesorRouter = require('./api/profesores')
const apiEstudianteRouter = require('./api/estudiantes')
const apiEstudiante_MateriaRouter = require('./api/materia_estudiante')

router.use('/materia',apiMateriaRouter)
router.use('/parametro',apiParametroRouter)
router.use('/valorparametro',apiValorParametroRouter)
router.use('/profesores',apiProfesorRouter)
router.use('/estudiantes',apiEstudianteRouter)
router.use('/materia_estudiantes',apiEstudiante_MateriaRouter)
module.exports = router