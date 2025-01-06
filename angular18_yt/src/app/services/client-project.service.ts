import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { APIResponse } from '../model/interface/role';

@Injectable({
  providedIn: 'root'
})
export class ClientProjectService {
  private apiBaseUrl = environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  getAllClientProjects():Observable<APIResponse>{
   return this.http.get<APIResponse>(`${this.apiBaseUrl}/GetAllClientProjects`)
  }

  addNewClientProjectUpdate(projectObjData:any):Observable<APIResponse>{
   return this.http.post<APIResponse>(`${this.apiBaseUrl}/AddUpdateClientProject`,projectObjData)
  }

}
