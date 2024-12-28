import React from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom';
const Navbar = ({userInfo}) => {
  const isToken = localStorage.getItem("token");
  const navigate= useNavigate();

  const onLogout=()=>{
    localStorage.clear();
    navigate("/login")
  }
  return (
    <div>
      <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10'>
        <h4 className='text-cyan-700 font-bold italic text-2xl'>Travel story</h4>
        { isToken && <ProfileInfo userInfo={userInfo} onLogout={onLogout} />}
      </div>
    </div>
  )
}

export default Navbar