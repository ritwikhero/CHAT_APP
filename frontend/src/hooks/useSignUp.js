import  {useState}  from 'react';
import toast from 'react-hot-toast';


const useSignUp = () => {
    const [loading,setLoading] = useState(false);

    const signup = async({fullName,userName,Password,confirmPassword,gender}) => {
        const success = handleInputErrors({fullName,userName,Password,confirmPassword,gender});

        if(!success){
            console.log("Not success , stuck in useSignup");
            return;
        } 

        setLoading(true);

        try {
            const res = await fetch("/api/auth/signup",{
                method :"POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({fullName,userName,Password,confirmPassword,gender}),

            });

            const data = await res.json();
            console.log(data);
        } 
        
        catch (error) {
            toast.error(error.message)
        }
        
        finally{
            setLoading(false);
        }
    };
return {loading,signup};
};

export default useSignUp;

function handleInputErrors({fullName,userName,Password,confirmPassword,gender}){
    if(!fullName || !userName || !Password || !confirmPassword || !gender){
        toast.error('Please fill in all fields')
        return false;
    }
    if(Password !== confirmPassword){
        toast.error('Password do not match');
        return false;
    }
    if(Password.length < 6){
        toast.error('Password must be atleast 6 charcters');
        return false;
    }
    return true;
}