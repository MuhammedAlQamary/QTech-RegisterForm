import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRegister } from '../models/IRegister.Model';
import { ILoginResponse } from '../models/IloginResponse.Model';
import { ILoginRequest } from '../models/IloginRequest.Model';
import { ILinksRequest } from '../models/ILinksRequest.Model';
import { IProfileRequest } from '../models/IProfileRequest.Model';
import { IProfileResponse } from '../models/IProfileResponse.Model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private baseUrl = 'http://qtechform.runasp.net/api/User';
  private baseUrl = 'https://localhost:7051/api/User';

  constructor(private http: HttpClient,   private router: Router) {}

  register(user: IRegister): Observable<String> {
    return this.http.post<String>(`${this.baseUrl}/register`, user);
  }

  login(credentials: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.baseUrl}/login`, credentials);
  }

  getProfile(): Observable<IProfileResponse> | null {
    let token = null;
    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('token');
    }
    if (!token && typeof sessionStorage !== 'undefined') {
      token = sessionStorage.getItem('token');
    }
    if (!token) {
      // navigate to login
      this.router.navigate(['/auth/login']);
      return null;
    }
    
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get<IProfileResponse>(`${this.baseUrl}/profile`, { headers });
  }

  updateProfile(profileData: IProfileRequest): Observable<string> | null {

    let token = null;
    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('token');
    }
    if (!token && typeof sessionStorage !== 'undefined') {
      token = sessionStorage.getItem('token');
    }
    if (!token) {
      // navigate to login
      this.router.navigate(['/auth/login']);
      return null;
    }
    
    const headers = { 'Authorization': `Bearer ${token}` };


    return this.http.put<string>(`${this.baseUrl}/profile`, profileData, { headers });
  }

  updateSocialMediaLinks(socialData: ILinksRequest): Observable<string> | null {

    let token = null;
    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('token');
    }
    if (!token && typeof sessionStorage !== 'undefined') {
      token = sessionStorage.getItem('token');
    }
    if (!token) {
      // navigate to login
      this.router.navigate(['/auth/login']);
      return null;
    }
    
    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.put<string>(`${this.baseUrl}/ReenterSocialMediaLinks`, socialData, { headers });
  }

  verifyMobileOtp(otpData: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/mobile-verify-otp`, otpData);
  }

  verifyEmailOtp(otpData: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/email-verify-otp`, otpData);
  }

  
}
