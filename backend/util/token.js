import jwt from "jsonwebtoken";

export const generateToken = (userId)=>{
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        if(!JWT_SECRET){
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const token = jwt.sign({id:userId},JWT_SECRET,{
            expiresIn:"7d"
        })
        return token;
    } catch (error) {
        console.log("error in generating token",error);
        throw error;
    }

}