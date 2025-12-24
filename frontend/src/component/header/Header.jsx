import React from 'react'
import  "./Header.css"
 function Header() {
 const styleHEader = {
    backgroundColor:'rgb(247, 172, 10)',
    width:'100%'
 }
 const styleKeeper = {
  padding:10,
  color:"white",


 }
  return (
     <>
         <div  style={styleHEader}>
           <h1 className="headerTitle" style={styleKeeper}> Keeper</h1>
         </div>
     </>
  )
}


export default Header
