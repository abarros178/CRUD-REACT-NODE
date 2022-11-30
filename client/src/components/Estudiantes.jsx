import React,{useState,useEffect} from 'react'
import axios from 'axios';

export const Estudiantes = () => {
    const [form, setform] = useState({
        identificacion:'',
        tipo_identificacion:0,
        nombre:'',

    })
    // const [foto, setfoto] = useState(second)

useEffect(() => {
    axios.get('http://localhost:3000/api/valorparametro', {
        responseType: 'json'
      })
        .then(function(res) {
          if(res.status==200) {
            console.log(res.data);
          }
        })
        .catch(function(err) {
          console.log(err);
        })

}, [])





  return (
    <div>
        <h1>
            estudiante
        </h1>
    </div>
  )
}
