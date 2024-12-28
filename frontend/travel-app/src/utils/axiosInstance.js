import axios from "axios";
import { BASE_URL } from "./constants";
const axiosInstance= axios.create({
    baseURL:BASE_URL,
    timeout:10000,
    headers:{
        "Content-Type":"application/json"
    },
})

//Used to intercept all outgoing requests made by axiosInstance
axiosInstance.interceptors.request.use(
    (config)=>{
        //Retrieve token from localStorage
        const accessToken= localStorage.getItem("token");
        //Add token to the headers
        if(accessToken){
            config.headers.Authorization=`Bearer ${accessToken}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error)
    }
)

export default axiosInstance;