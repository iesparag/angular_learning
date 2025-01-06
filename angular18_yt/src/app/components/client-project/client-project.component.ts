import { Component, inject, OnInit } from '@angular/core';
import { ClientProjectService } from '../../services/client-project.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { EmployeeService } from '../../services/employee.service';
import { IEmployee } from '../../model/interface/role';
import { Client } from '../../model/class/Client';

@Component({
  selector: 'app-client-project',
  imports: [ReactiveFormsModule],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css',
})
export class ClientProjectComponent implements OnInit {
  clientProjectList: any[] = [];
  clientList: Client[] = [];
  employeeList: IEmployee[] = [];
  clientService = inject(ClientService);
  clientProjectService = inject(ClientProjectService);
  employeeService = inject(EmployeeService);

  projectForm: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0, Validators.required), // Primary Key
    projectName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    startDate: new FormControl('', Validators.required),
    expectedEndDate: new FormControl('', Validators.required),
    leadByEmpId: new FormControl(''),
    completedDate: new FormControl(''), // Optional Date
    contactPerson: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    contactPersonContactNo: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$'), // Validating a 10-digit number
    ]),
    totalEmpWorking: new FormControl(0, [
      Validators.required,
      Validators.min(1),
    ]), // Minimum 1 employee working
    projectCost: new FormControl(0, [Validators.required, Validators.min(0)]), // Non-negative
    projectDetails: new FormControl('', Validators.required), // String
    contactPersonEmailId: new FormControl('', [
      Validators.required,
      Validators.email, // Validate email format
    ]),
    clientId: new FormControl(''),
  });

  ngOnInit(): void {
    this.onGetAllClientProjects();
    this.onGetAllClient();
    this.onGetAllEmployee();
  }

  onGetAllClientProjects() {
    this.clientProjectService.getAllClientProjects().subscribe({
      next: (result: any) => {
        this.clientProjectList = result.data;
        console.log('this.clientProjectList: ', this.clientProjectList);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Client Data fetching completed.');
      },
    });
  }
  
  onGetAllClient() {
    this.clientService.getAllClients().subscribe({
      next: (result: any) => {
        this.clientList = result.data;
        console.log('this.clientList: ', this.clientList);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Client Data fetching completed.');
      },
    });
  }

  onGetAllEmployee() {
    this.employeeService.getAllEmpoyeeData().subscribe({
      next: (result: any) => {
        this.employeeList = result.data;
        console.log('this.employeeList: ', this.employeeList);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Client Data fetching completed.');
      },
    });
  }

  onSaveProject() {
    const ConversionFormDataToObj = this.projectForm.value;
    console.log('ConversionFormDataToObj: ', ConversionFormDataToObj);
    debugger
    this.clientProjectService
      .addNewClientProjectUpdate(ConversionFormDataToObj)
      .subscribe({
        next: (result: any) => {
          this.clientProjectList = result.data;
          console.log('this.employeeList: ', this.employeeList);
          this.onGetAllClientProjects()
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('Client Data fetching completed.');
        },
      });
  }
}
