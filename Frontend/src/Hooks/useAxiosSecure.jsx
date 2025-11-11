import axios from "axios";
import {useContext, useEffect} from "react";
import {AuthContext} from "../Contexts/RootContext.jsx";
import {useNavigate} from "react-router";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000"
})
const useAxiosSecure = ()=>{
    const {user, logoutUser} = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(()=>{
       const requestInstance = axiosInstance.interceptors.request.use((config)=>{
           const token = user?.accessToken;
           if (token){
               config.headers.authorization = `Bearer ${token}`
           }
           return config;
       }, (error)=>{
           return Promise.reject(error)
       });


       const responseInstance = axiosInstance.interceptors.response.use((response)=>{
           return response
       }, (error)=>{
           const status = error.response?.status;
           if(status === 401 || status === 403){
               logoutUser().then(()=>{
                   navigate('/register')
               })
           }
           return Promise.reject(error)
       })

       return ()=>{
           axiosInstance.interceptors.request.eject(requestInstance);
           axiosInstance.interceptors.response.eject(responseInstance)
       }

    },[user, logoutUser, navigate])


    return axiosInstance;
}
export default useAxiosSecure;