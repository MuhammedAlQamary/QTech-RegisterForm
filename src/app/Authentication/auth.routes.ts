import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';

export const authRoutes: Routes = [
    {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'otp',
        component: OtpVerificationComponent
    }

];
