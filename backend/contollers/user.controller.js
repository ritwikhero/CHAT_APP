
export const getUserForSidebar = async (req,res) =>{
    try {
        const loggedInUser = 
    } catch (error) {
        console.log("error in getUserForSidebar controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}