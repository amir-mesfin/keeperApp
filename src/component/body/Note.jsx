import React from 'react'
import './note.css'
 function Note(props) {
  return (
    <>
     <div className="noteStyle">
      <h3>{props.tittle}</h3>
      <p> {props.text}</p>
     </div>  
  </>
   
  )
}
export default   Note
