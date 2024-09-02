import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async(req,res) =>{
    try{
        const{fullName,userName,Password,confirmPassword,gender} = req.body;
        
        if(Password !== confirmPassword){
            return res.status(400).json({error : "Password didn't match"});
        }

        const user = await User.findOne({userName});
        if(user){
            return res.status(400).json({error : "User already exists"});
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password,salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new User({
            fullName,
            userName,
            Password : hashedPassword,
            gender,
            profilePic : gender === "male" ? boyProfilePic : girlProfilePic
        });

        if(newUser){
            //generate JWT
            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                Password: newUser.Password,
                gender: newUser.gender,
                profilePic: newUser.profilePic
            });
        }else{
            return res.status(400).json({error : "Invalid user data"});
        }

    }catch(error){
        console.log("Error in signup controller", error.message);
        res.status(501).json({error:"Internal server error"});
    }
    // console.log("signupUser");
}

export const login = async (req,res) =>{
    // console.log("loginUser");
    try {
        const {userName,Password} = req.body;
        const user = await User.findOne({userName});
        const isPasswordCorrect = await bcrypt.compare(Password, user?.Password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error : "Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id : user._id,
            fullName : user.fullName,
            userName : user.userName,
            profilePic : user.profilePic
        });
    } catch (error) {
        console.log("Error in login controller",error.message);
        return res.status(500).json({error : "Internal server error"});
    }
}

export const logout = (req,res) =>{
    // console.log("logoutUser");
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message : "User logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error : "Internal server error"});
    }
}