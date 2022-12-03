const router = require("express").Router();
const { Estudiante, ValorParametro } = require("../../db");

router.get("/", async (req, res) => {
//   const estudiante = await Estudiante.findAndCountAll({
//     include: [{ model: ValorParametro },{ model: ValorParametro }],
//     where: { estado: "1" },
//   });
  const estudiante = await Estudiante.findAndCountAll({
    include: [{ 
        model:ValorParametro, 
        as: 'tipo_identificacion_pk' }, { 
            model:ValorParametro, 
            as: 'gemale_pk' }],
    where: { estado: "1" },
  });

  res.json(estudiante);
});

router.post("/", async (req, res) => {
  const estudiante = await Estudiante.create(req.body);
  res.json(estudiante);
});
router.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let { nombre, identificacion, tipo_identificacion, username, gemale } = req.body;

    const estudiante = await Estudiante.update(
      {
        nombre: nombre,
        identificacion: identificacion,
        tipo_identificacion: tipo_identificacion,
        username: username,
        gemale: gemale,
      },
      {
        where: { id: id },
      }
    );
    res.json(estudiante);
  } catch (err) {
    res.status(400).send("No se pudo actualizar", err);
  }
});

router.put("/delete/:id", async (req, res) => {
  try{
  let id = req.params.id;
  console.log(id)
  await Estudiante.update(
    { estado: "0" },
    { where: { id: id } }
  );
  res.send('Profesor eliminado')}
  catch(err){
    res.status(400).send("No se pudo eliminar", err);
  }
});

module.exports = router;
