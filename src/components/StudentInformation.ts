import { studentInformationRequest } from './../model/studentInformationRequest';
import { StudentServices } from './../services/students.services';
import {Component} from "@angular/core"
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector:"student",
  templateUrl:"./student.html"
})
export class StudentsInformationComponent {
  students=null;
  result =null;
  loadingComplete = false
  resultFromServiceCall=null
  letFailedResponse = "";
  deleting=false;
  closeResult: string;
  formValues:studentInformationRequest={
    FirstName:"",
  LastName:"string",
  DateOfBirth:"",
  EmailAddress:"string",
  Country:"string",
  Department:"string",
  Level:"string",
  DateRegistered:"string",
  Faculty:"string",
  GuardianName:"string"
  };
  registerForm = new FormGroup({});
  isFormValid = false
  processingForm = false;
  processingFormText = "please wait..."
  constructor(private studentService:StudentServices, private modalService: NgbModal){
    this.getAllStudent();
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName:new FormControl('', [Validators.required]),
      emailAddress:new FormControl('', [Validators.required]),
      dateOfBirth:new FormControl('', [Validators.required]),
      country:new FormControl('', [Validators.required]),
      level:new FormControl('', [Validators.required]),
      department:new FormControl('', [Validators.required]),
      guardianName:new FormControl('', [Validators.required]),
      state:new FormControl('', [Validators.required]),
      gender:new FormControl('', [Validators.required])
    })
  }


  async registerNewStudent() {
    this.processingForm = true
   // this.formValues.DateRegistered = new Date().toDateString()
    this.resultFromServiceCall = await this.studentService.addNewStudent(this.formValues);
    console.log(this.resultFromServiceCall)
    this.processingForm = false
  }
  fillFormValue($event) {
    let formName = $event.currentTarget.name
    let value = $event.currentTarget.value

    this.setFormValue(formName, value)
   // console.log(this.formValues)

    this.isFormValidTest()
    console.log(this.isFormValid)
  }

  isFormValidTest() {
    if(this.formValues.FirstName != "" && this.formValues.LastName != "string"
      && this.formValues.EmailAddress != "string" && this.formValues.DateOfBirth != "string") {
        this.isFormValid = true
      }
  }

  setFormValue(formName, value) {
    switch(formName) {
      case "firstName" :
          this.formValues.FirstName = value
        break;
        case "lastName" :
          this.formValues.LastName = value
        break;
        case "emailAddress" :
          this.formValues.EmailAddress = value
        break;
        case "dateOfBirth" :
          this.formValues.DateOfBirth = value
        break;
    }
  }
  get firstName() {
    return this.registerForm.get('firstName')
  }
  get dob() {
    return this.registerForm.get('dateOfBirth')
  }

  get email() {
    return this.registerForm.get('emailAddress')
  }

  get lastName() {
    return this.registerForm.get('lastName')
  }
  get gender() {
    return this.registerForm.get('gender')
  }

  getAllStudent() {
    setTimeout(async ()=>{
      this.result = await this.studentService.getAllStudent()
      // console.log(this.result)
       if(this.result.status != "99") {
         this.loadingComplete = true
         this.students=this.result.data
         console.log(this.students)
       }
    },3000)

  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  async deleteStudent($event, Id:number) {
    $event.preventDefault()
    this.deleting = true
    this.result = await this.studentService.deleteStunde(Id);
    if(this.result.status != "99") {
      this.deleting = false
     // this.students=this.result.data
     this.resultFromServiceCall = this.result.message
      console.log(this.resultFromServiceCall)
    }
    else {
      this.letFailedResponse = this.result.message
      this.deleting = false
    }
  }
}
