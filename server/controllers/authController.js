import UserModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validatePassword from "../helpers/validatePassword.js";

var salt=bcrypt.genSaltSync(10)


export async function register(req,res){
    try{

        const {email,password,name} = req.body

        console.log('req bodeee',req.body);

        if(!email || !password || !name){
            return res.json({err:true,message:'please enter all field'})
        }

        const validationPassword = validatePassword(password)

        console.log(validationPassword,'validdd');

        if(!validationPassword.status){
            return res.json({err:true,message:validatePassword.message[0].message})
        }

        let user = await UserModel.findOne({email})

        if(user){
            return res.json({err:true,message:validationPassword.message[0].message})
        }

        const hashPassword = bcrypt.hashSync(password,salt)
        console.log(hashPassword,'hass');
        user = await UserModel.create({name,email,password:hashPassword})

        const token = jwt.sign(
            {
                id:user._id
            },
            'mysecretjwtkey'
        )

        return res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            maxAge: 1000 * 60 * 5,
            sameSite:"none",
        }).json({err:false,message:'success'})
    }
    catch(err){
        res.json({err:true,message:'something went wrong'})
    }
}


export async function login(req,res){
    try{

        const {email,password} = req.body
        if(!email || !password){
            return res.json({err:true,message:'please enter all fields'})
        }

        let user = await UserModel.findOne({email})

        if(!user){
            return res.json({err:true,message:'no user found'})
        }

        if(!bcrypt.compareSync(password,user.password)){
            return res.json({err:true,message:'invalid password'})
        }

        const token = jwt.sign(
            {id:user._id},
            'mysecretjwtkey'
        )

        return res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            maxAge:1000*60*5,
            sameSite:'none'
        }).json({err:false,message:'success'})

    }
    catch(err){
        console.log(err);
        res.json({err:true, message:"something went wrong"})
    }
}


export const checkLogin = async(req,res)=>{
    try{
        console.log('enterh ererer');
        const token = req.cookies.token
        if(!token){
            console.log('entrereedd');
            return res.json({login:false, error:true, message:'no token'})
        }
        const verifiedJWT = jwt.verify(token,'mysecretjwtkey')
        console.log(verifiedJWT,'fdf');
        const user = await UserModel.findById(verifiedJWT.id,{password:0})

        if(!user){
            return res.json({login:false,message:'invalid user'})
        }

        return res.json({user,login:true,token})
    }
    catch(err){
    console.log(err)
    res.json({login:false,error:err})        
    }
}


export const logout=async (req,res) => {
 
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
    }).json({ message: "logged out", error: false });
}