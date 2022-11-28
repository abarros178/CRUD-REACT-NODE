const router =require('express').Router()

const {Materia} = require('../../db')

router.get('/', async (req,res)=>{
    const materias = await Materia.findAll();
    res.json(materias)
})

router.post('/', async (req,res)=>{
    const materias = await Materia.create(req.body)
    res.json(materias)
})

module.exports = router