const router = require("express").Router();
const { Materia, Profesor } = require("../../db");

router.get("/", async (req, res) => {
  const materia = await Materia.findAndCountAll({
    include: 
      {
        model: Profesor,
        as:'profesor_id_pk'
        
      },
    
    where: { estado: "1" },
  });
  res.json(materia);
});

router.post("/", async (req, res) => {
  const materia = await Materia.create(req.body);
  res.json(materia);
});
router.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let { nombre, ubicacion, profesor_id} = req.body;

    const materia = await Materia.update(
      {
        nombre: nombre,
        ubicacion: ubicacion,
        profesor_id: profesor_id,
      },
      {
        where: { id: id },
      }
    );
    res.json(materia);
  } catch (err) {
    res.status(400).send("No se pudo actualizar", err);
  }
});

router.put("/delete/:id", async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);
    await Materia.update({ estado: "0" }, { where: { id: id } });
    res.send("Materia eliminado");
  } catch (err) {
    res.status(400).send("No se pudo eliminar", err);
  }
});

module.exports = router;
