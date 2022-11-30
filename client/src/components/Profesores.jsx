import React, { useEffect, useState } from "react";
import { TIPO_PROFESOR } from "../../helper";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator";

export const Profesores = () => {
  const [form, setform] = useState({
    identificacion: "",
    nombre: "",
    tipo_profesor: 0,
  });
  const [profesores, setprofesores] = useState([]);
  const [modalcrear, setmodalcrear] = useState(false);
  const [cargando, setcargando] = useState(false);
  const [tipo_profesores_back, settipo_profesores_back] = useState([]);
  useEffect(() => {
    getprofesores();
    getparametro();
    if (profesores.length === 0) setmodalcrear(true);
  }, []);

  const onInputChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const getprofesores = async () => {
    setcargando(true);
    await axios
      .get("http://localhost:3000/api/profesores", {
        responseType: "json",
      })
      .then(function (res) {
        if (res.status == 200) {
          setprofesores(res.data.rows);
          setcargando(false);
        }
      })
      .catch(function (err) {
        console.log(err);
        setcargando(false);
      });
  };
  const getparametro = async () => {
    setcargando(true);
    await axios
      .get(`http://localhost:3000/api/valorparametro/${TIPO_PROFESOR}`, {
        responseType: "json",
      })
      .then(function (res) {
        if (res.status == 200) {
          settipo_profesores_back(res.data.rows);
          setcargando(false);
        }
      })
      .catch(function (err) {
        console.log(err);
        setcargando(false);
      });
  };
  return (
    <>
      <Dialog
        open={modalcrear}
        maxWidth="sm"
        fullWidth={true}
        onClose={() => setmodalcrear(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <AppBarModal titulo='¡ Crear profesores !' mostrarModal={modalcrear} titulo_accion='' /> */}
        <DialogContent>
          <ValidatorForm>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextValidator
                  value={form.identificacion}
                  required
                  // error={getError("celular", errores).length > 0}
                  // helperText={getError("celular", errores)}
                  type="number"
                  id="identificacion"
                  name="identificacion"
                  label="Identificacion del profesor"
                  fullWidth
                  validators={["required"]}
                  errorMessages={["El campo es requerido"]}
                  onChange={onInputChange}
                ></TextValidator>
              </Grid>
              <Grid item xs={6}>
                <TextValidator
                  value={form.nombre}
                  required
                  // error={getError("celular", errores).length > 0}
                  // helperText={getError("celular", errores)}
                  type="text"
                  id="nombre"
                  name="nombre"
                  label="Nombre del profesor"
                  fullWidth
                  validators={["required"]}
                  errorMessages={["El campo es requerido"]}
                  onChange={onInputChange}
                ></TextValidator>
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ width: 268 }}>
                  <SelectValidator
                    value={form.tipo_profesor}
                    required
                    // error={getError("celular", errores).length > 0}
                    // helperText={getError("celular", errores)}
                    id="tipo_profesor"
                    name="tipo_profesor"
                    label="Tipo de profesor"
                    fullWidth
                    validators={["required"]}
                    errorMessages={["El campo es requerido"]}
                    onChange={onInputChange}
                  >
                    {tipo_profesores_back.map(({ id, nombre }) => (
                      <MenuItem key={id} value={id}>
                        {nombre}
                      </MenuItem>
                    ))}
                  </SelectValidator>
                </FormControl>
              </Grid>
            </Grid>
          </ValidatorForm>

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setmodalcrear(false)} variant="text">
            Cerrar
          </Button>
          <Button type="submit" variant="text">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
