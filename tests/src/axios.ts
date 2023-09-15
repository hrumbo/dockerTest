import axios, {AxiosRequestConfig} from "axios";

//const baseURL= "http://localhost:3000"; //Your baseURL

//const baseURL= `http://${process.env.CONTAINER_IP || 'localhost'}:3000`; //Your baseURL

const baseURL = process.env.domain_url
  ? `http://${process.env.DOMAIN_URL}` // Use domain_url if it exists
  : `http://${process.env.CONTAINER_IP || 'localhost'}:3000`; // Fallback to CONTAINER_IP or localhost


console.log("BASE URL: " + baseURL);

//const baseURL= "https://node-app-testing-week.azurewebsites.net"; //Your baseURL

const axiosConfig:AxiosRequestConfig ={
    baseURL
}

export default axiosConfig;