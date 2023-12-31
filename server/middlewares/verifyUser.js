import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";


const verifyUser = async (req, res, next) => {
    try {
  
        const token = req.cookies.token;
       
        if (!token){
            return res.json({ loggedIn: false, err: true, message: "no token" });
        }
        
        const verifiedJWT = jwt.verify(token, 'mysecretjwtkey');
    
        const user = await UserModel.findById(verifiedJWT.id, { password: 0 });
        if (!user) {
            return res.json({ loggedIn: false, err:true, message:"unauthorized" });
        }
        // console.log(user)
        req.user=user;
        next()
    } catch (err) {
        console.log('enterer herere');
        console.log(err)
        res.json({ loggedIn: false, error: err, err:true, message:"something went wrong" });
    }
}
export default verifyUser