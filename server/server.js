import 'dotenv/config.'
import express from 'express'
import dbConnect from './dbConnect.js'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import exp from 'constants'


const app=express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.resolve()+'/public'))

app.use(
    cors({
        origin:[
            'http://localhost:3000'
        ],
        credentials:true,
    })
)



dbConnect()