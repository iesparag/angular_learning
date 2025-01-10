import { Component, OnInit } from '@angular/core';
import { ToasterService, ToasterMessage } from '../../../core/services/toaster.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toaster',
  imports: [CommonModule],
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
})
export class ToasterComponent implements OnInit {
  toasterMessage: ToasterMessage | null = null;

  constructor(private toasterService: ToasterService) {}

  ngOnInit(): void {
    // Subscribe to toaster messages
    this.toasterService.toaster$.subscribe((message) => {
      this.toasterMessage = message;
    });
  }
}
