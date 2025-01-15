import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToasterService } from '../../../core/services/toaster.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/state/app.state';
import { loginStart } from '../state/auth.actions';
import { selectAuthError, selectIsAuthenticated } from '../state/auth.selectors';

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
  isAuthenticated$: any;
  authError$: any;
  constructor(private fb: FormBuilder, private store: Store<AppState> ,private authService: AuthService, private router: Router,private toasterService: ToasterService ) {
    // Initialize the form with FormBuilder
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email field with validation
      password: ['', [Validators.required, Validators.minLength(6)]], // Password field with validation
    });
  }
 
  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.authError$ = this.store.select(selectAuthError);
    // Any logic to be run when the component is initialized can go here
  }

  // Submit form logic
  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;
      this.store.dispatch(loginStart({ email, password }));
      // this.store.select(selectIsAuthenticated).subscribe(isAuthenticated => {
      //   console.log('isAuthenticated: ', isAuthenticated);
      //   debugger
      //   if (isAuthenticated) {
      //     this.router.navigate(['/products']); // Redirect to /products after login success
      //   }
      // });

    }
  }
}
