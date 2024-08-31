import { useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import { Link } from 'react-router-dom'
import useSignUp from '../../hooks/useSignUp'
const SignUp = () => {
  const [inputs,setInputs] = useState({
    fullName : "",
    userName : "",
    Password : "" ,
    confirmPassword : "",
    gender : ""
  })

  const {loading,signup} = useSignUp();

  const handleCheckboxChange = (gender) => {
    setInputs({...inputs, gender});
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };



  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'> 
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
            SignUp
            <span className='text-blue-400'> ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
          <label className='label p-4'>
            <span className='text-base label-text'>Full name</span>
          </label>
          <input type="text" placeholder='John Doe' className='w-full input input-bordered h-10'
          value={inputs.fullName}
          onChange={(e) => setInputs({...inputs, fullName: e.target.value})}/>
          </div>

          <div>
          <label className='label p-4'>
            <span className='text-base label-text'>Username</span>
          </label>
          <input type="text" placeholder='JohnDoe' className='w-full input input-bordered h-10'
          value={inputs.userName}
          onChange={(e) => setInputs({...inputs, userName: e.target.value})}
          />
          </div>

          <div>
          <label className='label p-4'>
            <span className='text-base label-text'>Password</span>
          </label>
          <input type="password" placeholder='Enter Password' className='w-full input input-bordered h-10'
          value={inputs.Password}
          onChange={(e) => setInputs({...inputs, Password: e.target.value})}/>
          </div>

          <div>
          <label className='label p-4'>
            <span className='text-base  label-text'>Confirm Password</span>
          </label>
          <input type="password" placeholder='Confirm Password' className='w-full input input-bordered h-10'
          value={inputs.confirmPassword}
          onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}/>
          </div>

          {/* <GenderCheckbox></GenderCheckbox> */}
          <GenderCheckbox onCheckboxChange = {handleCheckboxChange} selectedGender = {inputs.gender} />

          <Link to="/login" className='text-sm text-amber-50 hover:underline hover:text-blue-600 mt-2 inline-block'>
                  Already have an account ?
          </Link>
          <div>
                  <button className='btn btn-block btn-sm mt-2'>Sign Up</button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default SignUp;