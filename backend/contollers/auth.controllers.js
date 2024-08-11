import User from "../models/user.model.js";

export const signup = async(req,res) =>{
    try{
        const{fullName,userName,Password,confrimPassword,gender} = req.body;
        
        if(Password !== confrimPassword){
            return res.status(400).json({error : "Password didn't match"});
        }

        const user = await User.findOne({userName});
        if(user){
            return res.status(400).json({error : "User already exists"});
        }

        //Hash password

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new User({
            fullName,
            userNanme,
            password,
            gender,
            profilePic : gender === "male" ? boyProfilePic : girlProfilePic
        });

        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            userName: newUser.userNanme,
            password: newUser.Password,
            gender: newUser.gender,
            profilePic: newUser.profilePic
        })
    }catch(error){
        console.log("Error in signup controller", error.message);
        res.status(501).json({error:"Internal server error"});
    }
    console.log("signupUser");
}

export const login = (req,res) =>{
    console.log("loginUser");
}

export const logout = (req,res) =>{
    console.log("logoutUser");
}