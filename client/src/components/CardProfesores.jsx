import { Button, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { EditOutlined, EllipsisOutlined, SettingOutlined,DeleteOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import React from 'react'
import Meta from 'antd/es/card/Meta';

 const CardProfesores = ({profesor}) => {
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
                {profesor.}
                </Typography> 
              
          </CardContent>
        
        </CardActionArea>
        <CardActions>
          <Button variant='text'>Mas informacion</Button>
            </CardActions>
      
      </Card> */}
      <Card
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src={profesor.avatarlink}
      />
    }
    actions={[
      <EditOutlined key="edit" />,
      <DeleteOutlined key="delete" />
    ]}
  >
    <Meta
      title={profesor.nombre}
      description="This is the description"
    />
  </Card>
    </div>
  )
}
export default CardProfesores
