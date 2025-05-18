import React, { children } from 'react'

 const User = (props) => {
   return (
    <>
    <div>
        <center><h1  style={{ color: 'orange' }}> <p>Name:{props.Name}</p></h1>
        <p style={{color:'brown'}}> email:{props.email}</p>
      roll_no:{props.roll_no}</center>
         {props.children}
    </div>
    </>
  )
}
export default User
