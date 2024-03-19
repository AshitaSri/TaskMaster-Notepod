import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.services';

@Component({
  selector: 'app-register',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    // Check if required fields are empty
    if (!this.username || !this.email || !this.password) {
      this.errorMessage = 'All fields are required';
      return;
    }

    // Standard checks for email and password
    if (!this.validateEmail(this.email)) {
      this.errorMessage = 'Please enter a valid email';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long';
      return;
    }

    // If all checks pass, proceed with registration
    this.authService.register(this.username, this.email, this.password).subscribe((response: any) => {
      console.log('Registration successful', response);
      this.router.navigate(['/login']);
    }, (error: any) => {
      console.error('Registration error', error);
      if (error && error.error && error.error.message) {
        this.errorMessage = error.error.message; // Display specific error message from the backend
      } else {
        this.errorMessage = 'Registration failed. Please try again later.';
      }
    });
  }

  // Function to validate email format
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Function to clear error message when user interacts with the form
  clearErrorMessage() {
    this.errorMessage = '';
  }
}
