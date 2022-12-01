const router = require("express").Router();
const { Profesor, ValorParametro } = require("../../db");

router.get("/", async (req, res) => {
  const profesor = await Profesor.findAndCountAll({
    include: [{ model: ValorParametro }],
    where: { estado: "1" },
  });
  res.json(profesor);
});

router.post("/", async (req, res) => {
  const profesor = await Profesor.create(req.body);
  res.json(profesor);
});
router.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let { nombre, identificacion, tipo_profesor, username, gemale } = req.body;

    const profesor = await Profesor.update(
      {
        nombre: nombre,
        identificacion: identificacion,
        tipo_profesor: tipo_profesor,
        username: username,
        gemale: gemale,
      },
      {
        where: { id: id },
      }
    );
    res.json(profesor);
  } catch (err) {
    res.status(400).send("No se pudo actualizar", err);
  }
});

router.put("/delete/:id", async (req, res) => {
  try{
  let id = req.params.id;
  console.log(id)
  await Profesor.update(
    { estado: "0" },
    { where: { id: id } }
  );
  res.send('Profesor eliminado')}
  catch(err){
    res.status(400).send("No se pudo eliminar", err);
  }
});

module.exports = router;
