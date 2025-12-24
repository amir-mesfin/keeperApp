import React from 'react'
import "./Footer.css"

const  current = new Date();

 function Footer() {
  const fullYear = current.getFullYear();
  
  return (
    <div className='footerStyle'>
      <p>Amir copy right  preserved {fullYear}</p>
    </div>
  )
}



export default   Footer ;