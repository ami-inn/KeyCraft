import React, { useState } from 'react';

import axios from 'axios';
import './Register.css'
import validatePassword from '../../helper/validatePassword';
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";


function Register({setRefresh}) {
    const [err, setErr] = useState("")
    const [sEmail,setSemail]=useState("")
    const [lEmail,setLemail]=useState("")
    
    const [lPassword,setLpassword]=useState("")
    const [sPassword,setSpassword]=useState("")

    const [name,setName]=useState('')
    const [loading,setLoading]=useState(false)
    const [logOpen,setlogOpen]=useState(false)

    // gooogle auth
    

    let clientId='140726925070-dg7n53e2cjpf9ppqot3uqlkjkgpk8o35.apps.googleusercontent.com'
 

 
    /////


    const haldePassword=(e)=>{
      setSpassword(e.target.value)

      const validationPassword = validatePassword(e.target.value)

      if(!validationPassword.status){
        setErr(validationPassword.message[0].message)
      }else{
        setErr("")
      }
    }

   

    const handleRegisterSignup=async(e)=>{
      e.preventDefault()
      setLoading(false)
      let {data}= await axios.post('/register',{name,email:sEmail,password:sPassword})

      if(!data.err){
        console.log(data);
        setRefresh(refresh => !refresh)
        alert('success')
      }else{
        console.log(data);
        setErr(data.message)
        alert('error')
      }
    }

    const handleLogin=async(e)=>{
      e.preventDefault()
      setLoading(true)

      let {data} = await axios.post('/login',{email:lEmail,password:lPassword})

      if(data.err){
        alert('error')
      }else{
        setRefresh(refresh => !refresh)
        alert('success')
      }
    }

    const demoLogin = async (e) => {
      e.preventDefault();
      console.log('enterr');
      setLoading(true)
      let { data } = await axios.post("/login", { email:"amipk2001@gmail.com", password:"ami@123Pk" });
      
      console.log(data);
      if (data.err) {
        setErr(data.message)
      } else {
        setRefresh(refresh => !refresh)
      }
      setLoading(false)
    }

  return (
    <>
    <div className='body'>
    <div className="main">

  <div className="signup">
    <form onSubmit={handleRegisterSignup}>
      <label className='labelField' htmlFor="chk" aria-hidden="true" onClick={()=>setlogOpen(!logOpen)}>signup</label>
      <input className='inputBoxLogin' type="text" value={name} onChange={(e)=>setName(e.target.value)} name="txt" placeholder="user name" required />
      <input className='inputBoxLogin' type="email" value={sEmail} onChange={(e)=>setSemail(e.target.value)} name="email" placeholder="email" required />
      <input className='inputBoxLogin' type="password" value={sPassword} onChange={haldePassword} name="pswd" placeholder="password" required />
      <button className='button' type='submit' >sign up</button>
    </form>
         {
            err &&
            <div className="text-left">
              <p className='text-danger'>{err}</p>
            </div>
          }


  </div>
  <div className={`login ${logOpen?'loginactive':''}`}>
    <form onSubmit={handleLogin}>
      <label htmlFor="chk" className='labelField' aria-hidden="true" onClick={()=>setlogOpen(!logOpen)}>login</label>
      <input className='inputBoxLogin2' value={lEmail} onChange={(e)=>setLemail(e.target.value)} type="email" name="email" placeholder="Email" required />
      <input className='inputBoxLogin2' type="password" onChange={(e) => setLpassword(e.target.value)} name="pswd" placeholder="password" required />
      <button className='button' type='submit'>Login</button>
    
    </form>
    <button className='dbutton' onClick={demoLogin}>Demo</button>
    <div>
      <LoginSocialGoogle
        client_id={clientId}
        scope="openid profile email"
        discoveryDocs="claims_supported"
        access_type="offline"
        onResolve={({ provider, data }) => {
          console.log(provider, data);
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <GoogleLoginButton />
      </LoginSocialGoogle>
    </div>

  
  </div>
</div>
    </div>



    </>

  )
}

export default Register
