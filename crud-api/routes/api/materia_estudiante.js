const router = require("express").Router();
const { Materia_Estudiante, Materia,Estudiante } = require("../../db");

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
        where:{id:id}
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
  const materia_estudiante = await Materia_Estudiante.create(req.body);
  res.json(materia_estudiante);
});
// router.put("/:id", async (req, res) => {
//   try {
//     let id = req.params.id;
//     let { nombre, identificacion, tipo_profesor, username, gemale } = req.body;

//     const profesor = await Profesor.update(
//       {
//         nombre: nombre,
//         identificacion: identificacion,
//         tipo_profesor: tipo_profesor,
//         username: username,
//         gemale: gemale,
//       },
//       {
//         where: { id: id },
//       }
//     );
//     res.json(profesor);
//   } catch (err) {
//     res.status(400).send("No se pudo actualizar", err);
//   }
// });

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
