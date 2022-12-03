import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ModalMateria from './ModalMateria';
import ModalProfeVacio from './ModalProfeVacio';
// import EditIcon from '@material-ui/icons/Edit';
// import BlockIcon from '@material-ui/icons/Block';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export const Materias = () => {
  const [form, setform] = useState({
    nombre: "",
    ubicacion: "",
    profesor_id: "",
  });
  const [profesores, setprofesores] = useState([]);
  const [materias, setmaterias] = useState([]);
  const [modalcrear, setmodalcrear] = useState(false);
  const [modalprovacio, setmodalprovacio] = useState(false);
  const [modalconfirmar, setmodalconfirmar] = useState(false);
  const [cargando, setcargando] = useState(false);
  useEffect(() => {
    const obtenerprofe = async () => {
      await getprofesores()
    }

    obtenerprofe()
    setmodalprovacio(true);
    setmodalcrear(true)




  }, [])

  const onInputChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    getmaterias()



  }, [modalcrear,modalconfirmar])
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
  const getmaterias = async () => {
    setcargando(true);
    await axios
      .get("http://localhost:3000/api/materia", {
        responseType: "json",
      })
      .then(function (res) {
        if (res.status == 200) {
          setmaterias(res.data.rows);
          setcargando(false);

        }
      })
      .catch(function (err) {
        console.log(err);
        setcargando(false);
      });

  };
  const onsubmit = async () => {
    if(!form.estado){
    await axios
      .post("http://localhost:3000/api/materia", form)
      .then((res) => {
        if (res.status == 200) {
          setmodalcrear(false);
          message.success("Materia guardado con exito");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }else {
      await axios
      .put(`http://localhost:3000/api/materia/${form.id}`, form)
      .then((res) => {
        if (res.status == 200) {
          setmodalcrear(false);
          message.success("Materia editada con exito");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
  const limpiar_abrir = () => {
    setmodalcrear(true)
    setform({
      nombre: "",
      ubicacion: "",
      profesor_id: "",
    });
  }
  const eliminar_materia = async () => {
    await axios
      .put(`http://localhost:3000/api/materia/delete/${form.id}`)
      .then((res) => {
        if (res.status == 200) {
          setmodalconfirmar(false);
          message.success("Materia eliminada con exito");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
const editar_materia= (materia) => {
  setform(materia)
  setmodalcrear(true)
}
const eliminar_confirmacion = (profesor) => {
  setmodalconfirmar(true)
  setform(profesor)
}
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h1" component="div">
            LISTA DE MATERIAS
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={() => limpiar_abrir()} variant="contained">
            Agregar materias
          </Button>
        </Grid>
        <Grid item xs={12} >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre de la materia</TableCell>
                  <TableCell>Ubicacion</TableCell>
                  <TableCell align="right">DNI del profesor</TableCell>
                  <TableCell align="right">Nombre del profesor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {materias.map((materia) => (
                  <TableRow
                    key={materia.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {materia.nombre}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {materia.ubicacion}
                    </TableCell>
                    <TableCell align="right">{materia.profesor_id_pk.identificacion}</TableCell>
                    <TableCell align="right">{materia.profesor_id_pk.nombre}</TableCell>
                    <TableCell align="right">
                      <IconButton variant='text' onClick={()=>{editar_materia(materia)}} color="primary" aria-label="upload picture" component="span">
                      <EditOutlined />
                    </IconButton>
                    </TableCell>
                    <TableCell align="right">
                    <IconButton variant='text' onClick={()=>{eliminar_confirmacion(materia)}} color="primary" aria-label="upload picture" component="span">
                    <DeleteOutlined />
                    </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <ModalMateria
        form={form}
        modalcrear={modalcrear}
        setmodalcrear={setmodalcrear}
        onInputChange={onInputChange}
        profesores={profesores}
        onsubmit={onsubmit}

      />
      <ModalProfeVacio
        modalprovacio={modalprovacio}
        setmodalprovacio={setmodalprovacio}
      />
      <Dialog
        open={modalconfirmar}
        aria-labelledby="responsive-dialog-title"
        maxWidth="sm"
        fullWidth={true}
        onClose={() => setmodalconfirmar(false)}
      >
        <DialogTitle id="responsive-dialog-title">
          {`Desea eliminar a ${form.nombre}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Si elimina esta materia desaparecera de la lista y no la podra recuperar
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>setmodalconfirmar(false)}>
            Cerrar
          </Button>
          <Button onClick={()=>eliminar_materia()} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
