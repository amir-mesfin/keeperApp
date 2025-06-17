import React from 'react'
import "./Footer.css"

const  current = new Date();

 function Footer() {
  const fullYear = current.getFullYear();
  
  return (
    <div className='footerStyle'>
      <p>abushe copy right {fullYear}</p>
    </div>
  )
}



export default   Footer ;