import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001'; // Your backend API URL

  constructor(private http: HttpClient) {}

  register(username: string, email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/user/register`, { username, email, password });
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/user/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        console.log('Token Stored:', response.token); // Log the token stored in localStorage
        console.log('Token Payload:', response.tokenPayload); // Log the token payload if available
        
      })
    );
  }
}
