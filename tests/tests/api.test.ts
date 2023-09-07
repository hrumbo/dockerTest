import { Service } from "../src/service";

describe("API Test Suite", ()=>{

 const apiService = new Service();
 
 it("Get books", async ()=>{
    const getBooksResponse = await apiService.getBooks();
    expect(getBooksResponse.status).toEqual(200);
    console.log(getBooksResponse.data);
 })
 
})