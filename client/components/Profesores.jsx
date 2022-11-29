import React, { useEffect } from 'react'
import axios from 'axios';

export const Profesores = () => {
    
    useEffect( () => {

        axios.get('http://localhost:3000/api/profesores', {
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
                Profesores
            </h1>
        </div>
    )
}
