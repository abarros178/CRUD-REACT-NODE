const router = require('express').Router()

const apiMateriaRouter = require('./api/materia')
const apiParametroRouter = require('./api/parametros')
const apiValorParametroRouter = require('./api/valorparametro')

router.use('/materia',apiMateriaRouter)
router.use('/parametro',apiParametroRouter)
router.use('/valorparametro',apiValorParametroRouter)
module.exports = router