import React from 'react'
import { getInitials } from '../../utils/helper';

const ProfileInfo = ({userInfo}) => {
    const onLogout=()=>{};
    if (!userInfo) {
        return null; 
    }
const initial =getInitials(userInfo?.fullName)
  return (
    userInfo && 
    (<div className='flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
            {initial}
        </div>
        <div>
            <p className='text-sm font-medium'>{userInfo.fullName || ""}</p>
            <button className='text-sm text-slate-700 underline' onClick={onLogout}>Log out</button>
        </div>
    </div>)
  )
}

export default ProfileInfo