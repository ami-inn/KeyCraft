import 'dotenv/config'
import express from 'express'
import dbConnect from './dbConnect.js'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import exp from 'constants'
import verifyUser from './middlewares/verifyUser.js'
import { checkLogin, googleLogin, login, logout, register } from './controllers/authController.js'
import { addPassword, deletePassword, getPassword } from './controllers/passwordController.js'


const app=express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.resolve()+'/public'))

app.use(
    cors({
        origin: [
          "http://localhost:3000", 
          "https://keycraft.netlify.app/"
        ],
        credentials: true,
      })
)



dbConnect()

app.get("/", (req, res)=>res.send("App running"))
app.post('/login',login)
app.get('/login/check',checkLogin)
app.get('/logout',logout)
app.post('/register',register)
// app.post('/google-login',googleLogin)
app.post('/password/add',verifyUser,addPassword)
app.get('/passwords',verifyUser,getPassword)
app.patch('/password',verifyUser,deletePassword)


app.listen(4000,()=>{
    console.log('sever running on http://localhost:4000');
})
