import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";

export const Profesores = () => {
  const [profesores, setprofesores] = useState([])
  const [modalcrear, setmodalcrear] = useState(false)
  const [cargando, setcargando] = useState(false)
  useEffect(() => {
    setcargando(true)
    getprofesores()
    if(profesores.length===0)setmodalcrear(true)

  }, []);

  const getprofesores = async () => {
   await axios
      .get("http://localhost:3001/api/profesores", {
        responseType: "json",
      })
      .then(function (res) {
        if (res.status == 200) {
          setprofesores(res.data.rows)
          setcargando(false)
        }
      })
      .catch(function (err) {
        console.log(err);
        setcargando(false)
      });
  };
  return (
    <div>
      <Dialog open={modalcrear} maxWidth='sm' fullWidth={true} onClose={()=>setmodalcrear(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        {/* <AppBarModal titulo='¡ Crear profesores !' mostrarModal={modalcrear} titulo_accion='' /> */}
        <DialogContent style={{ padding: 0 }} className='scroll' >
          
          <h1>hola</h1>
        </DialogContent>
        <DialogActions>
        <Button onClick={()=>setmodalcrear(false)} variant="text">Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
