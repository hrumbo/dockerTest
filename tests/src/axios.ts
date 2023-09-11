import axios, {AxiosRequestConfig} from "axios";

//const baseURL= "http://localhost:3000"; //Your baseURL

const baseURL= "http://0.0.0.0:3000"; //Your baseURL

//const baseURL= `http://${process.env.CONTAINER_IP || 'localhost'}:3000`; //Your baseURL

const axiosConfig:AxiosRequestConfig ={
    baseURL
}

export default axiosConfig;