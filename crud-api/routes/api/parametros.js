const router = require("express").Router();

const { Parametro } = require("../../db");

router.get("/", async (req, res) => {
  const parametros = await Parametro.findAll();
  res.json(parametros);
});

router.post("/", async (req, res) => {
  const parametros = await Parametro.create(req.body);
  res.json(parametros);
});
router.put("/:id", async (req, res) => {
    try{
  let id = req.params.id;
  let { nombre } = req.body;
  const parametros = await Parametro.update(
    req.body,
    {
      where: { id: id },
    }
  );
  res.json(parametros);
}catch(err){
    res.status(400).send('No se pudo actualizar',err)
}
});

module.exports = router;
