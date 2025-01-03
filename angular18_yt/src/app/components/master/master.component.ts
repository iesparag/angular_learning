import { Component } from '@angular/core';
import { RolesComponent } from '../roles/roles.component';
import { DesignationComponent } from '../designation/designation.component';
import { CommonModule } from '@angular/common';

// decorator
@Component({
  selector: 'app-master',
  imports: [RolesComponent,DesignationComponent,CommonModule],
  templateUrl: './master.component.html',
  styleUrl: './master.component.css'
})
export class MasterComponent {
  currentComponent: string = "Role"

  changeRole (Role:string){
    this.currentComponent = Role;
  }
}
