import React, { useEffect, useState } from "react";
import { TIPO_PROFESOR } from "../../helper";
import axios from "axios";
import { message } from 'antd';
import CardProfesores from "./CardProfesores.jsx";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Typography,
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
    tipo_profesor: "",
  });
  const [profesores, setprofesores] = useState([]);
  const [modalcrear, setmodalcrear] = useState(false);
  const [cargando, setcargando] = useState(false);
  const [tipo_profesores_back, settipo_profesores_back] = useState([]);
  useEffect(() => {
    getprofesores();
    getparametro();
    console.log('entre');
    if (profesores.length === 0) setmodalcrear(true);
    setform({
      identificacion: "",
      nombre: "",
      tipo_profesor: ""
    })
  }, [modalcrear]);

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

  const content = profesores.map(profe => <Grid item xs={3} > <CardProfesores key={profe.id} profesor={profe} /></Grid>)

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
  const onsubmit = (e) => {
    axios.post('http://localhost:3000/api/profesores', form)
      .then(res => {
        if (res.status == 200) {
          setmodalcrear(false)
          message.success('Profesor guardado con exito')
        }
      }).catch(err => {
        console.log(err)
      });
    e.preventDefault()
  }
  return (
    <>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h1" component="div">
            LISTA DE PROFESORES
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={() => setmodalcrear(true)} variant="contained">
            Agregar profesores
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            {content}
          </Grid>
        </Grid>
      </Grid>


      <Dialog
        open={modalcrear}
        maxWidth="sm"
        fullWidth={true}
        onClose={() => setmodalcrear(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <AppBarModal titulo='¡ Crear profesores !' mostrarModal={modalcrear} titulo_accion='' /> */}
        <ValidatorForm onSubmit={onsubmit}>
          <DialogContent>

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

          </DialogContent>
          <DialogActions>
            <Button onClick={() => setmodalcrear(false)} variant="text">
              Cerrar
            </Button>
            <Button type="submit" variant="text">
              Guardar
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </>
  );
};
