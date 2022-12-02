const router = require("express").Router();
const { Materia, Profesor } = require("../../db");

router.get("/", async (req, res) => {
  const materia = await Materia.findAndCountAll({
    include: 
      {
        model: Profesor,
        
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
  try {
    let id = req.params.id;
    console.log(id);
    await Materia.update({ estado: "0" }, { where: { id: id } });
    res.send("Profesor eliminado");
  } catch (err) {
    res.status(400).send("No se pudo eliminar", err);
  }
});

module.exports = router;
