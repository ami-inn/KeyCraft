import React, { useEffect, useState } from 'react';

import axios from 'axios'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Register from './components/Register/Register';
import Home from './components/Home/Home';


function App() {
  axios.defaults.baseURL='http://localhost:4000'
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

        <Route path='/' element={<Home user={user} refresh={refresh} setRefresh={setRefresh}/>} />
        {/* <Route path='/login' element={<Navigate to={'/'} />} /> */}
        <Route path='/register' element={<Navigate to={'/'} />}/>
        
        </>
      )
    }
    
    {
      user.login===false && (
        <>
        <Route path='/' element={<Navigate to={'/register'}/>} />
        {/* <Route path="/login" element={<Navigate to={'/login'}/>}/> */}
        <Route path='/register' element={<Register setRefresh={setRefresh}/>}/>
        </>
      )
    }
    </Routes>


    </Router>

</>
  );
}

export default App;