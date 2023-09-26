import React from 'react';
 interface pagepros{
    params:{
        log:string,
        name:number
        
    }
 }

const log = (p:pagepros) => {
  return (
    <div>
        <h1>my name is {p.params.log}</h1>
        <h1>my name is {p.params.name}</h1>


        

      
    </div>
  )
}

export default log
