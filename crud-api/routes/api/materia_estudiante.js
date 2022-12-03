const router = require("express").Router();
const { Materia_Estudiante, Materia, Estudiante } = require("../../db");

router.get("/", async (req, res) => {
  const materia_estu = await Materia_Estudiante.findAndCountAll({
    include: [
      {
        model: Materia,
        as: "id_materia_aaa",
      },
      {
        model: Estudiante,
        as: "id_estudiante_aaa",
      },
    ],
    where: { estado: "1" },
  });
  res.json(materia_estu);
});
router.get("/materia/:id", async (req, res) => {
  let id = req.params.id;

  const materia_estu = await Materia_Estudiante.findAndCountAll({
    include: [
      {
        model: Materia,
        as: "id_materia_aaa",
        where: { id: id },
      },
      {
        model: Estudiante,
        as: "id_estudiante_aaa",
      },
    ],
    where: { estado: "1" },
  });
  res.json(materia_estu);
});

router.post("/", async (req, res) => {
  const validar = await Materia_Estudiante.findAll({
    where: {
      id_materia: req.body.id_materia,
      id_estudiante: req.body.id_estudiante,
      estado:"1"
    },
  });
  if(validar.length > 0) {
    res.status(400).send("El estudiante ya esta guardado")
  }else{
  const materia_estudiante = await Materia_Estudiante.create(req.body);
  res.json(materia_estudiante);}
});
router.put("/:id", async (req, res) => {

    let id = req.params.id;
    let { id_materia, id_estudiante } = req.body;

    const validar = await Materia_Estudiante.findAll({
      where: {
        id_materia: id_materia,
        id_estudiante: id_estudiante,
        estado:"1"
      },
    });
    if(validar.length > 0) {
    res.status(400).send("El estudiante ya esta guardado")

    }else {
 const materia_estu = await Materia_Estudiante.update(
      {
        id_materia: id_materia,
        id_estudiante: id_estudiante,
      },
      {
        where: { id: id },
      }
    );
    res.json(materia_estu);
  }   
});

// router.put("/delete/:id", async (req, res) => {
//   try {
//     let id = req.params.id;
//     console.log(id);
//     await Profesor.update({ estado: "0" }, { where: { id: id } });
//     res.send("Profesor eliminado");
//   } catch (err) {
//     res.status(400).send("No se pudo eliminar", err);
//   }
// });

module.exports = router;
