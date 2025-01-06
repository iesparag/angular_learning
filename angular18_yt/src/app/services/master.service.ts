import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../model/interface/role';
import { environment } from '../../environments/environment.development';


// decorator
@Injectable({
  providedIn: 'root'
})
export class MasterService {
  private apibaseurl = environment.apiBaseUrl
  constructor(private http: HttpClient) { }

  getDesignations():Observable<APIResponse>{
    return this.http.get<APIResponse>(`${this.apibaseurl}/GetAllDesignation`)
  }

}
