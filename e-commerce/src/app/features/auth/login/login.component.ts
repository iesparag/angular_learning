import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToasterService } from '../../../core/services/toaster.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule,RouterLink], // if you're using any common modules here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; // Declare the login form group
  errorMessage: string = ''; // To store error message
  isLoading: boolean = false; // To show a loading spinner if necessary

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,private toasterService: ToasterService ) {
    // Initialize the form with FormBuilder
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email field with validation
      password: ['', [Validators.required, Validators.minLength(6)]], // Password field with validation
    });
  }

  ngOnInit(): void {
    // Any logic to be run when the component is initialized can go here
  }

  // Submit form logic
  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;

      // Authenticate using AuthService
      this.authService.login({ email, password }).subscribe({
        next: (response) => {
          console.log('response: ', response);
          this.isLoading = false;

          // Check for successful login and redirect to /products
          if (response.success) {
            debugger
            this.router.navigate(['/products']); // Redirect to products page
            this.toasterService.show('Login successful!', 'success', 3, 'top-right');
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Invalid email or password';
          this.toasterService.show('Login failed. Please check your credentials.', 'error', 3, 'top-right');
        },
      });
    }
  }
}
