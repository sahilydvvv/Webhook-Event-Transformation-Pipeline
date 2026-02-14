import {User} from "../model/User.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../util/token.js";

export const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = generateToken(newUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
      message: "user created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    console.log("error in signup", error);
    return res.status(500).json({ message: "internal server error" });
  }
};


export const signin = async (req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"all fields are required"});
        }
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(404).json({message:"user not found"});
        }
        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
        if(!isPasswordCorrect){
            return res.status(401).json({message:"invalid credentials"});
        }
        const token = generateToken(existingUser._id);
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        })
        
        return res.status(200).json({message:"user signed in successfully",user:{
            id:existingUser._id,
            name:existingUser.name,
            email:existingUser.email
        }});

    } catch (error) {
        console.log("error in signin",error);
        return res.status(500).json({message:"internal server error"});
        
    }
}

export const logout = async (req,res)=>{
    try {
        res.clearCookie("token",{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"strict"
        });
        return res.status(200).json({message:"user logged out successfully"});
        
    } catch (error) {
        console.log("error in logout",error);
        return res.status(500).json({message:"internal server error"});
        
    }
}