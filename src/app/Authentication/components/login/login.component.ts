import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { log } from 'console';
import { CommonModule } from '@angular/common';
import { IPlatform } from '../../models/IPlatform.Model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  showPassword = false;
  showConfirmPassword = false;
  loginForm: FormGroup;
  

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]

    });

    
  }
  
  
// 

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
      this.userService.login(this.loginForm.value).subscribe({
        next: (response) => {
          // remmeber me
          if (this.loginForm.value.rememberMe) {
            localStorage.setItem('token', response.token);
            
          } else {
            sessionStorage.setItem('token', response.token);
          }

          this.router.navigate(['/auth/profile']);
        },
        error: (error) => {
          this.loginForm.setErrors({  invalidCredentials: true });
        }
      });
      
    } else {
      console.log('Form is invalid');
    }
  }
}
