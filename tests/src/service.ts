import axios from "axios";
import axiosConfig from "./axios";

export class Service {

    path = "/api/books"

 async getBooks(){
    return axios.get(this.path, axiosConfig);
 };   

 async postBook(data){
    return axios.post(this.path, axiosConfig);
 };   

}