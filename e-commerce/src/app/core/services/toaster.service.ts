import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToasterMessage {
  message: string;
  type: 'success' | 'error' | 'warning';
  duration: number; // in seconds
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

@Injectable({
  providedIn: 'root',
})

export class ToasterService {
  private toasterSubject = new BehaviorSubject<ToasterMessage | null>(null);
  toaster$ = this.toasterSubject.asObservable();

  show(message: string, type: 'success' | 'error' | 'warning', duration: number = 3, position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'top-right') {
    const toasterMessage: ToasterMessage = { message, type, duration, position };
    this.toasterSubject.next(toasterMessage);

    setTimeout(() => {
      this.toasterSubject.next(null);
    }, duration * 1000);
  }
}
