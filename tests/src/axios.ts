import axios, {AxiosRequestConfig} from "axios";

//const baseURL= "http://localhost:3000"; //Your baseURL

//const baseURL= `http://${process.env.CONTAINER_IP || 'localhost:3000'}`; //Your baseURL

const baseURL= "http://$172.17.0.3"; //Your baseURL

console.log("BASE URL: " + baseURL);

//const baseURL= "https://node-app-testing-week.azurewebsites.net"; //Your baseURL

const axiosConfig:AxiosRequestConfig ={
    baseURL
}

export default axiosConfig;