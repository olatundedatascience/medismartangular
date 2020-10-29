import { response } from './../model/response';
import { studentInformationRequest } from './../model/studentInformationRequest';
import axios from "axios"

interface IStudentServices
{
  addNewStudent(student:studentInformationRequest);
  deleteStunde(Id:number);
  updateStudent(Id:number, student:studentInformationRequest),
  getAllStudent(),
  getStudent(Id:number)
}

export class StudentServices implements IStudentServices {

    baseURL = "https://localhost:5001/api/Student"
    response:response;
 //})
  constructor(){}
  async addNewStudent(student: studentInformationRequest) {
    console.log("incoming ->", student)
    try {
      var result = await axios({
        url:this.baseURL+"/addNewStudent",
        method:"POST",
        data:{...student},
        headers:{
          "Content-Type":"application/json"
        }

      })
      console.log(result.data)
      // var url =  this.baseURL+"/addNewStudent"
      // this.response = await axios.post(url, {...student}, {
      //   headers:{
      //     "Content-Type":"application/json"
      //   }
      // })
      // console.log("resp ->", this.response)
      // if(this.response.statusCode == "00") {
      //   return {
      //     status:"00",
      //     message:this.response.message
      //   }
      // }
      // else {
      //   return {
      //     status:"99",
      //     message:this.response.description
      //   }
      // }
    } catch (error) {
      return {
        status:"99",
        message:new Error(error).message
      }
    }
  }
  async deleteStunde(Id: number) {
    try {
      let url = this.baseURL+`/deleteStudent/${Id}`;
      this.response = await (await axios.delete(url)).data
      if(this.response.statusCode == "00") {
        return {
          status:"00",
          message:this.response.message

        }
      }
      else {
        return {
          status:"99",
          message:this.response.description
        }
      }
    }
    catch(error) {
      return {
        status:"99",
        message:new Error(error).message
      }
    }
  }
  updateStudent(Id: number, student: studentInformationRequest) {
    throw new Error('Method not implemented.');
  }
  async getAllStudent() {
    try {
      var url =  this.baseURL+"/getAll"
      this.response = await (await axios.get(url)).data
     // console.log("resonse ->",this.response)
      if(this.response.statusCode == "00") {
        return {
          status:"00",
          message:this.response.message,
          data:this.response.responseData
        }
      }
      else {
        return {
          status:"99",
          message:this.response.description
        }
      }
    } catch (error) {
      return {
        status:"99",
        message:new Error(error).message
      }
    }
  }
  async getStudent(Id: number) {
    try {
      let url = this.baseURL+`/deleteStudent/${Id}`;
      this.response = await (await axios.get(url)).data
      if(this.response.statusCode == "00") {
        return {
          status:"00",
          message:this.response.message

        }
      }
      else {
        return {
          status:"99",
          message:this.response.description
        }
      }
    }
    catch(error) {
      return {
        status:"99",
        message:new Error(error).message
      }
    }
  }

}



