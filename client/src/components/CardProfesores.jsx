import { Button, CardActionArea, CardActions, CardContent, CardMedia, Dialog, DialogContent, Grid, Typography } from '@mui/material'
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Card, message } from 'antd';
import React, { useEffect, useState } from 'react'
import Meta from 'antd/es/card/Meta';
// import Modaleditprofesor from './Modaleditprofesor.jsx';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

const CardProfesores = ({ profesor, onInputChange, tipo_profesores_back, tipo_sexo_back, modaledit, setmodaledit }) => {
  const [ayudaa, setayudaa] = useState({})
  const modalaaaa =(profesor2) => {
    console.log(profesor2);
    setmodaledit(true)
    setayudaa(profesor2)
    return (
      <h1></h1>
    )
   
  }


  return (
    <div>
      {/* <Card sx={{ height:"250px", width:"250px" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"
            src={profesor.avatarlink}
            alt={profesor.original_title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {profesor.nombre}
            </Typography>
                 <Typography variant="body2" color="text.secondary">
                {profesor.username}
                </Typography> 
              
          </CardContent>
        
        </CardActionArea>
        <CardActions>
          <Button onClick={
            () => {modalaaaa(profesor)}
          } variant='text'>Editar</Button>
            </CardActions>
      
      </Card> */}
      <Card
        style={{ width: 300 }}
        cover={
          <img
            src={profesor.avatarlink}
          />
        }
        actions={[
          <EditOutlined onClick={() => 

            // console.log(profesor);
            modalaaaa(profesor)
          } key="edit" />,
          <DeleteOutlined key="delete" />
        ]}
      >
        <Meta
          title={profesor.nombre}
          description={`El usuario generado para el profesor es: ${profesor.username}`}
        />
      </Card>
      <Dialog
        open={modaledit}
        maxWidth="sm"
        fullWidth={true}
        onClose={() => setmodaledit(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <ValidatorForm onSubmit={onsubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextValidator
                  value={ayudaa.identificacion}
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
                    // onChange={onInputChange}
                ></TextValidator>
              </Grid>
            </Grid>
          </DialogContent>
        </ValidatorForm>
      </Dialog>

      {/* <Modaleditprofesor
          modaledit={modaledit}
          setmodaledit={setmodaledit}
          profesor={ayudaa}
          setprofesor={setprofesorstate}
          onInputChange={onInputChange}
          tipo_sexo_back={tipo_sexo_back}
          tipo_profesores_back={tipo_profesores_back}

          /> */}

    </div>
  )
}
export default CardProfesores
