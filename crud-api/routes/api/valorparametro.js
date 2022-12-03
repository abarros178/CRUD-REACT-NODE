const router = require("express").Router();
const { ValorParametro,Parametro } = require("../../db");

router.get("/", async (req, res) => {
  
  const valorParametro = await ValorParametro.findAndCountAll({
    include: [
      {model : Parametro}
    ]
  });
  res.json(valorParametro);
});
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  const valorParametro = await ValorParametro.findAndCountAll({
    include: [
      {model : Parametro}
    ],
    where:{parametroId:id}
  });
  res.json(valorParametro);
});

router.post("/", async (req, res) => {
  const valorParametro = await ValorParametro.create(req.body);
  res.json(valorParametro);
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

module.exports = router;
