import mongoose from "mongoose";


function dbConnect(){
mongoose.connect('mongodb://127.0.0.1/KeyCraft').then(result=>{
    console.log('database connected');
}).catch((err)=>{
    console.log('database error'+err);
})

}

export default dbConnect