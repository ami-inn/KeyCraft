import React, { useEffect, useState } from 'react';

import axios from 'axios'
import {Router, Routes, Route, Navigate} from 'react-router-dom'


function App() {
  axios.defaults.baseURL='http://localhost/4000'
  axios.defaults.withCredentials=true

  const [user,setUser] = useState({login:null,details:{}})
  const [refresh,setRefresh]=useState(true)

  useEffect(()=>{
    (
      async function (){
        let {data} = await axios.get('/login/check')

        if(!data.login){
          setUser({...user,login:false})
        }else{
          setUser({...user,login:true,details:data.user})
        }
      }
    )();
  },[refresh])

  return (
<>

    <Router>

    <Routes>

    {
      user.login && (
        <>

        <Route path='/' />
        <Route path='/login' element={<Navigate to={'/'} />} />
        <Route path='/register' element={<Navigate to={'/'} />}/>
        
        </>
      )
    }
    
    {
      user.login===false && (
        <>
        <Route path='/' element={<Navigate to={'/'}/>} />
        <Route path="/login"/>
        <Route path='/register'/>
        </>
      )
    }
    </Routes>


    </Router>

</>
  );
}

export default App;