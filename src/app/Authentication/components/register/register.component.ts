// Path: src/app/user/register/register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MustMatch } from '../../validations/must-match';
import { IRegister } from '../../models/IRegister.Model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IPlatform } from '../../models/IPlatform.Model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;


  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['', Validators.required],
      mobile: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerms: [false, Validators.requiredTrue],
      verifyPhone: [false],
      verifyEmail: [false],
    });

  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {

    if (this.registerForm.invalid) {
      // Mark all controls as touched to trigger validation messages
      this.registerForm.markAllAsTouched();
      return;
    }
  
    // Extract form values
    let formData: IRegister = this.registerForm.getRawValue();

    console.log(formData);
    // Call the register method from UserService
    this.userService.register(formData).subscribe({
      next: (response) => {
        this.router.navigate(['/auth/login']);
        // Optionally, navigate to a different page or show a success message
      },
      error: (error) => {
        console.error('Registration error', error);
        this.registerForm.setErrors({ 
          registrationFailed: error.error.message,
        });

        // Display a user-friendly error message
        this.handleError(error);
      },
    });
  }


  private handleError(error: any) {
    if (error.status === 400) {
      // Bad Request - likely validation errors
      console.error('Validation error:', error.error);
      // Display validation errors to the user
    } else if (error.status === 500) {
      // Internal Server Error
      console.error('Server error:', error.message);
      // Inform the user about server issues
    } else {
      // Generic error handling
      console.error('An unexpected error occurred:', error.message);
      // Provide a generic error message to the user
    }
  }
}
