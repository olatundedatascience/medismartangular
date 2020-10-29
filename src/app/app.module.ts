import { MaterialModule } from './../components/MaterialModule';
import { AddNewStudentModalComponent } from './../components/ModalComponent';
import { studentInformationRequest } from './../model/studentInformationRequest';
import { StudentServices } from './../services/students.services';
import { StudentsInformationComponent } from './../components/StudentInformation';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StudentsInformationComponent,
    AddNewStudentModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, NgbModule, ReactiveFormsModule
  ],
  providers: [StudentServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
