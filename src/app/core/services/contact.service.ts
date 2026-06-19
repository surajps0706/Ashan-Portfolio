import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor() {}

  sendMessage(message: ContactMessage): Observable<{ success: boolean; message: string }> {
    // Simulate API request to backend
    console.log('Sending message to API:', message);
    return of({
      success: true,
      message: 'Thank you for reaching out, Alex will get back to you shortly!'
    }).pipe(delay(1500));
  }
}
