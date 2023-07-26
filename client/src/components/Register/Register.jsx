import React, { useState } from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBNavbar,
  MDBRow,
  MDBCol,
  MDBNavbarBrand,
  MDBSpinner
}
  from 'mdb-react-ui-kit';

  import { Link } from 'react-router-dom'
import axios from 'axios';
import './Register.css'


function Register({setRefresh}) {
    const [err, setErr] = useState("")
    const [loading,setLoading]=useState(false)
    const [logOpen,setlogOpen]=useState(false)
  return (
    <>
    <div className='body'>
    <div className="main">

  <div className="signup">
    <form action>
      <label className='labelField' htmlFor="chk" aria-hidden="true" onClick={()=>setlogOpen(!logOpen)}>signup</label>
      <input className='inputBoxLogin' type="text" name="txt" placeholder="user name" required />
      <input className='inputBoxLogin' type="email" name="email" placeholder="email" required />
      <input className='inputBoxLogin' type="password" name="pswd" placeholder="password" required />
      <button className='button' >sign up</button>
    </form>
  </div>
  <div className={`login ${logOpen?'loginactive':''}`}>
    <form action>
      <label htmlFor="chk" className='labelField' aria-hidden="true" onClick={()=>setlogOpen(!logOpen)}>login</label>
      <input className='inputBoxLogin2' type="email" name="email" placeholder="Email" required />
      <input className='inputBoxLogin2' type="password" name="pswd" placeholder="password" required />
      <button className='button'>Login</button>
      <button className='dbutton'>Demo</button>
    </form>
  </div>
</div>
    </div>



    </>

  )
}

export default Register
