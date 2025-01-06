import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../model/interface/role';
import { Client } from '../model/class/Client';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiBaseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  getAllClients(): Observable<APIResponse> {
    return this.http.get<APIResponse>(
      `${this.apiBaseUrl}/GetAllClients`
    );
  }

  addUpdateClient(clientObj: Client): Observable<APIResponse> {
    return this.http.post<APIResponse>(
      `${this.apiBaseUrl}/AddUpdateClient`,
      clientObj
    );
  }

  deleteClient(clientId: Client['clientId']): Observable<APIResponse> {
    return this.http.delete<APIResponse>(
      `${this.apiBaseUrl}/DeleteClientByClientId?clientId=${clientId}`
    );
  }
}
