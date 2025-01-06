import { Component, inject, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { APIResponse } from '../../model/interface/role';
import { FormsModule } from '@angular/forms';
import { Client } from '../../model/class/Client';

@Component({
  selector: 'app-client',
  imports: [FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent implements OnInit {
  clientList: Client[] = [];
  clientObj: Client = new Client();
  clientService = inject(ClientService);

  ngOnInit(): void {
    this.onGetAllClient();
  }

  onGetAllClient() {
    this.clientService.getAllClients().subscribe({
      next: (result: APIResponse) => {
        this.clientList = result.data;
      },
      error: (error) => {
        console.log('Error:', error);
        alert(error);
      },
      complete: () => {
        console.log('Client Data fetching completed.');
      },
    });
  }

  onAddUpdate(){
    this.clientService.addUpdateClient({...this.clientObj}).subscribe({
      next: (result: APIResponse) => {
        this.clientList = result.data;
        this.onGetAllClient()
        this.clientObj = new Client()
      },
      error: (error) => {
        console.log('Error:', error);
        alert(error);
      },
      complete: () => {
        console.log('Client Added fetching completed.');
      },
    })
  }

  onEdit(updateClientObj:Client){
      this.clientObj = {...updateClientObj}
  }

  onDelete(clientId:Client["clientId"]){
    const isConfirm = confirm("are you want to delete ?");
    if(isConfirm){
      this.clientService.deleteClient(clientId).subscribe({
        next: (result: APIResponse) => {
          this.clientList = result.data;
          this.onGetAllClient()
          this.clientObj = new Client()
        },
        error: (error) => {
          console.log('Error:', error);
          alert(error);
        },
        complete: () => {
          console.log('Client deleted Successfully.');
        },
      })
    }else{
      return 
    }
  }

  onReset(){
    this.clientObj = new Client()
  }

}
