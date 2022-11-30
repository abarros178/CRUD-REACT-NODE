import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

 const CardProfesores = ({profesor,id}) => {
  return (
    <div>
        <Card sx={{ height:"200px", width:"250px" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"
            src="https://api.lorem.space/image/face?w=150&h=150"
            // alt={profesor.original_title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {profesor.nombre}
            </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                {profesor.}
                </Typography> */}
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}
export default CardProfesores
