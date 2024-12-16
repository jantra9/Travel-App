import React, { useState } from 'react'
import PasswordInput from '../../components/Input/PasswordInput'
import { useNavigate } from 'react-router-dom';
import validateEmail from '../../utils/validateEmail';
import axiosInstance from '../../utils/axiosInstance';

const SignUp = () => {
  const [name, setName]= useState("");
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [error, setError]= useState(null);
  const navigate= useNavigate();
  const handleSignUp =async(e)=>{
    e.preventDefault();
    if(!name){
      setError("Please enter your name.")
      return;
    }
    if(!validateEmail(email)){
      setError("Please enter a valid email addresss.")
      return;
    }
    if(!password){
      setError("Please enter the password")
      return;
    };
    setError("");

    //Sign up API call
    try {
      const response= await axiosInstance.post("/create-account",{
          fullName:name,
          email:email,
          password:password
        })

      //Handle successful login response
      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
        //response.data is whatever backend response set
      }
    } catch (error) {
      //Handle login error
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      } else{ setError("An unexpected error occurred. Please try again.")}
    }
  }
  return (
    <div className='h-screen bg-cyan-50 overflow-hidden relative'>
      <div className='login-ui-box right-10 -top-40'></div>
      <div className='login-ui-box bg-cyan-200 -bottom-40 right-1/2'></div>
      <div className='container h-screen flex items-center justify-center px-20 mx-auto'>
          <div className='w-2/4 h-[90vh] flex items-end bg-signup-bg-img bg-cover bg-center rounded-lg p-10 z-50' >
            <div>
              <h4 className='text-5xl text-white font-semibold leading-[58px]'>
                Join the <br/>Adventure
              </h4>
              <p className='text-[15px] text-white leading-6 pr-7 mt-4'>
                Create an account to start documenting your travels and preserving your meories in your personal travel journal.
              </p>
            </div>
          </div>   
          <div className='w-2/4 h-[90vh] bg-white rounded-r-lg relative p-6 shadow-lg shadow-cyan-200/[20]'>
            <form onSubmit={handleSignUp}>
              <h4 className='text-2xl font-semibold mb-3'>Sign Up</h4>
              <input 
              placeholder='Full Name' className='input-box' 
              type='text'
              value={name}
              onChange={({target})=>{setName(target.value)}}
              />
              <input 
              placeholder='Email' className='input-box' 
              type='text'
              value={email}
              onChange={({target})=>{setEmail(target.value)}}
              />
              <PasswordInput 
              value={password}
              onChange={({target})=>{setPassword(target.value)}}
              />
              {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
              <button type='submit' className='btn-primary'>CREATE ACCOUNT</button>
              <p className='text-xs text-slate-500 text-center my-1'>Or</p>
              <button className='btn-primary btn-light' onClick={()=>{navigate("/signUp")}} type="submit">LOGIN</button>
            </form>
          </div>
      </div>
    </div>
  )
}

export default SignUp