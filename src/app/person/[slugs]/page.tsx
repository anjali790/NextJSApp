import React from 'react'

const Person = ({params} :{params :{slugs:string}}) => {
  return (
    <div>
        <h1>My name is {params.slugs}</h1>
      
    </div>
  )
}

export default Person
