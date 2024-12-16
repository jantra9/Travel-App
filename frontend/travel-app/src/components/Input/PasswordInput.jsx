import React,{useState} from 'react'
import { FaRegEye, FaRegEyeSlash  } from "react-icons/fa";

const PasswordInput = ({value, onChange, placeholder}) => {
    const [isShowPass, setIsShowPass]= useState(false);
    const toggleShowPass= ()=>{
        setIsShowPass(!isShowPass)
    }
  return (
    <div className='input-box flex'>
        <input 
        className='w-full text-sm bg-transparent rounded outline-none'
        type={isShowPass ? "text" : "password"} 
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Password"}
        />
        {
            isShowPass ? 
            (<FaRegEye 
                size={22}
                className='text-primary cursor-pointer'
                onClick={()=>{
                    toggleShowPass()
                }}
            />
            ):(<FaRegEyeSlash
                size={22}
                className='text-slate-400cursor-pointer'
                onClick={()=>{
                    toggleShowPass()
                }}
            />)
        }
    </div>
  )
}

export default PasswordInput