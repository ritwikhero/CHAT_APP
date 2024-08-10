export const signup = async(req,res) =>{
    try{
        const{fullName,userName,Password,confrimPassword,gender} = req.body;
        
    }catch(error){

    }
    console.log("signupUser");
}

export const login = (req,res) =>{
    console.log("loginUser");
}

export const logout = (req,res) =>{
    console.log("logoutUser");
}