import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { IProfileResponse } from '../../models/IProfileResponse.Model';
import { IProfileRequest } from '../../models/IProfileRequest.Model';
import { UserService } from '../../services/user.service';
import { ILinksRequest } from '../../models/ILinksRequest.Model';
import { IPlatform } from '../../models/IPlatform.Model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
removePlatform(index: number) {
    this.socialFormArray.removeAt(index);
}
  profileForm!: FormGroup;
  links!: FormArray;
  profile!: IProfileResponse;
  selectedTab = 'personalInfo';
  private fb = inject(FormBuilder);
  private profileService = inject(UserService);
  socialForm!: FormGroup;
  platformArray: IPlatform[] = [];

  constructor() { 
    this.platformArray = [
      { name: 'Facebook', username: '', url: '', logo: 'facebook-logo.png' },
      { name: 'Twitter', username: '', url: '', logo: 'twitter-logo.png' },
      { name: 'LinkedIn', username: '', url: '', logo: 'linkedin-logo.png' },
      { name: 'Instagram', username: '', url: '', logo: 'instagram-logo.png' },
      { name: 'Snapchat', username: '', url: '', logo: 'snapchat-logo.png' },
      { name: 'Pinterest', username: '', url: '', logo: 'pinterest-logo.png' },
      { name: 'YouTube', username: '', url: '', logo: 'youtube-logo.png' },
      { name: 'Reddit', username: '', url: '', logo: 'reddit-logo.png' },
      { name: 'TikTok', username: '', url: '', logo: 'tiktok-logo.png' }
    ];

    this.socialForm = this.fb.group({
      platforms: this.fb.array([
        
      ])
    });
  }

  getFormGroupImage(formGroupIndex: number): string {
    return this.socialFormArray.controls[formGroupIndex]?.get("logo")?.value;
  }

  addPlatform(platformName: string): void {
    let platform = this.platformArray.find(p => p.name === platformName);

    if(this.socialFormArray.controls.find((control: any) => control.get('Platform').value === platformName)) {
      return;
    }

    this.socialFormArray.push(this.fb.group({
      Username: ['', Validators.required],
      logo: [platform?.logo],
      Url: ['', Validators.required],
      Platform: [platformName]
    }));
  }

  get socialFormArray(): FormArray {
    return this.socialForm.get('platforms') as FormArray;
  }


  ngOnInit(): void {
    this.profileForm = this.fb.group({
      personalImage: [""],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      fullNameArabic: ['', Validators.required],
      fullNameEnglish: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      nationality: ['', Validators.required],
      gender: [1, Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      fullAddress: ['', Validators.required],
      aboutMe: [''],
      socialMediaLinks: this.fb.array([])
    });

    this.loadProfile();
  }

  get socialMediaLinks(): FormArray {
    return this.profileForm.get('socialMediaLinks') as FormArray;
  }

  private loadProfile(): void {
    this.profileService.getProfile()?.subscribe((response: any) => {
      this.profile = response.message;
      if (this.profile.dateOfBirth) {
        if (!this.profile.dateOfBirth.includes("T")) {
          this.profile.dateOfBirth = new Date(this.profile.dateOfBirth).toISOString().split('T')[0];
        } else {
          this.profile.dateOfBirth = this.profile.dateOfBirth.split('T')[0];
        }
      } else {
        // If dateOfBirth is null, assign a default value or handle it appropriately
        this.profile.dateOfBirth = ''; // or set a default value like '' or another placeholder
      }
      this.profileForm.patchValue(this.profile);
      console.log("pro", this.profile);
      this.profile.socialMediaLinks.forEach((link:any) => {
        this.socialFormArray.push(this.fb.group({
          Platform: [link.platform],
          Username: [link.username],
          Url: [link.url]
        }));
      });
    });    
  }

  onSubmit(): void {
    console.log("Submit Profile: ", this.profileForm.value);
    const profileData: IProfileRequest = this.profileForm.value;
    this.profileService.updateProfile(profileData)?.subscribe(() => {
      alert('Profile updated successfully');
    });
  }

  onSubmitSocialMediaLinks(): void {
    const socialData: ILinksRequest = this.socialFormArray.value;
    console.log("array", socialData);
    this.profileService.updateSocialMediaLinks(socialData)?.subscribe({
      next: (response) => {
        alert('Social media links updated successfully')
      },
      error: err => {
        console.error('Error updating social media links', err);
      }
    },
    );
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  onImageUpload(): void {
    // Implement image upload logic here
  }
}
