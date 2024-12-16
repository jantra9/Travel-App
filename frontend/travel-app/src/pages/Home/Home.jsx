import React, { useEffect,useState } from 'react'
import Navbar from '../../components/Input/Navbar'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance';


const Home = () => {
  const navigate= useNavigate();
  const [userInfo, setuserInfo] = useState(null);
  //Get User Info
  const getUserInfo= async()=>{
    try {
      const response= await axiosInstance.get("/get-user");
      if(response.data&&response.data.user){
        setuserInfo(response.data.user)
      }
    } catch (error) {
      if(error.response.status ===401){
        localStorage.clear();
        navigate("/login")
      }
    };
  };
useEffect(()=>{
  getUserInfo();
  return()=>{};
})
  return (
  <>
    <Navbar />
  </>
  )
}

export default Home