import mongoose from "mongoose";


function dbConnect(){
mongoose.connect('mongodb+srv://ameenameen7772:ami123Pk@cluster0.7mc7tzs.mongodb.net/Keycraft?retryWrites=true&w=majority').then(result=>{
    console.log('database connected');
}).catch((err)=>{
    console.log('database error'+err);
})

}

export default dbConnect