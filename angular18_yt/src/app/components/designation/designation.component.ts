import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { APIResponse, IDesignation } from '../../model/interface/role';

@Component({
  selector: 'app-designation',
  imports: [],
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.css'
})
export class DesignationComponent implements OnInit {
  isLoading:boolean = true;
  designationList: IDesignation[]= []
  masterService = inject(MasterService);

  ngOnInit(): void {
    this.masterService.getDesignations().subscribe({
      next: (res: APIResponse) => {
        this.designationList = res.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.log('Error:', error);
        this.isLoading = false;
        alert(error);
      },
      complete: () => {
        this.isLoading = false;
        console.log('Designation Data fetching completed.');
      }
    });
  }

}
