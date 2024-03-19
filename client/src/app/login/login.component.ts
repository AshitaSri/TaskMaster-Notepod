import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.services';
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // Property to hold error message

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe((response: any) => {
      console.log('Login successful', response);
      this.router.navigate(['/TodoList']);
    }, (error: HttpErrorResponse) => { // Capture HttpErrorResponse
      console.error('Login error', error);
      if (error.status === 400) {
        this.errorMessage = 'Invalid email or password'; // Customize error message for 400 status
      } else {
        this.errorMessage = 'An error occurred. Please try again later.'; // Generic error message
      }
    });
  }
}
