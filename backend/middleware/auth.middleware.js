
import jwt from "jsonwebtoken";
export const authMiddleware = async (req,res,next) =>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"unauthorized access"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = {id:decoded.id};
        next();
    } catch (error) {
        return res.status(401).json({message:"invalid token"});
    }
}
