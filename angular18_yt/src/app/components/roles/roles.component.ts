import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIResponse, IRole } from '../../model/interface/role';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.development';

// decortor
@Component({
  selector: 'app-roles',
  imports: [FormsModule, CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})


export class RolesComponent implements OnInit {
  apiBaseUrl = environment.apiBaseUrl;
  roleList: IRole[] = []
  
  // oldWay
      // constructor(private http: HttpClient){
            // 
      // }
  // new way
    http = inject(HttpClient)

   ngOnInit(): void {
    this.getAllRoles()
   }


   getAllRoles(){
      this.http.get<APIResponse>(`${this.apiBaseUrl}/GetAllRoles`).subscribe((res:APIResponse)=> {
        this.roleList = res.data
      })
   }

  // string , number , boolean, date, object, arry,null , undefined
  // firstName:string = "Angular learning by parag jain"
  // angularVersion = "version 19"
  // version: number = 19;
  // isActive: boolean= false;
  // currentDate: Date = new Date();
  // inputType: string = "button";
  // selectedState: string = ""

  // // how we can define function in typeScript.
  // showWelcomeAlert(){
  //   alert("welcome Angular 18 tutorial")
  // }

  // showMessageAlert(Message: string){
  //   alert(Message)
  // }
}
