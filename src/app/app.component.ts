import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from './Authentication/components/register/register.component';
import { LoginComponent } from './Authentication/components/login/login.component';
import { ProfileComponent } from './Authentication/components/profile/profile.component';
import { OtpVerificationComponent } from './Authentication/components/otp-verification/otp-verification.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'QTech-RegisterForm';
}
