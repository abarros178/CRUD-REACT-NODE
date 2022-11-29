const router = require("express").Router();
const { Profesor,ValorParametro} = require("../../db");

router.get("/", async (req, res) => {
  const profesor = await Profesor.findAndCountAll({
    include: [
      {model : ValorParametro,
    
    },
    ]
  });
  res.json(profesor);
});

router.post("/", async (req, res) => {
  const profesor = await Profesor.create(req.body);
  res.json(profesor);
});
router.put("/:id", async (req, res) => {
    try{
  let id = req.params.id;
  let { nombre } = req.body;
  const valorParametro = await ValorParametro.update(
    req.body,
    {
      where: { id: id },
    }
  );
  res.json(valorParametro);
}catch(err){
    res.status(400).send('No se pudo actualizar',err)
}
});

router.delete("/",async (req, res) => {
    const eliminarprofe= await Profesor.destroy({
        where: { id: 1}
    })
})

module.exports = router;
