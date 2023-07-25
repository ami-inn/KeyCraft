
import passwordModel from "../models/passwordModel.js";
import { encrypt } from "../helpers/encryptDecryt.js";
import { decrypt } from "dotenv";


export async function addPassword(req,res){
    try{
        console.log(req.user);
        const {appName,password,userName}=req.body

        if(!appName || !password || !userName){
            return res.json({err:true,message:'please input all details'})
        }

        let passwordExist = await passwordModel.findOne({userId:req.user._id,appName,userName})

        console.log(passwordExist);

        if(passwordExist){
            return res.json({err:true,message:'password already exists'})
        }

        let encryptedPassword = encrypt(password)
        const passwordPresent = await passwordModel.findOne({'password.encryptedData':encryptedPassword.encryptedData})

        if(passwordPresent){
            return res.json({err:true,message:'not an unique password'})
        }

        const newPassword = await passwordModel.create({appName,userName,userId:req.user._id,password:encryptedPassword})
        return res.json({err:false,message:'success'})
    }
    catch(err){
        res.json({err:true,message:'internal server error'})
    }
}

export async function getPassword(req,res){
    try{
        let passwords = await passwordModel.find({userId:req.user._id})

        passwords= passwords.map((item)=>{
            return { appName:item.appName, userName:item.userName, _id:item._id, password: decrypt(item.password)}
        })
        return res.json({err:true,message:'success'})

    }
    catch(err){
        res.json({err:true,message:'internal server error'})
    }
}

export async function deletePassword(req,res){
    try{

        console.log(req.body.id);
        await passwordModel.deleteOne({userId:req.user._id,_id:req.body.id})

        return res.json({err:false , message:'successfully deleted'})
    }
    catch(err){
        res.json({err:true,message:'internal server error'})
    }
}