import { ILinksRequest } from "./ILinksRequest.Model";

export interface IProfileResponse {
    firstName: string;
    lastName: string;
    countryCode: string;
    mobile: string;
    email: string;
    createdAt: string;
    personalImage: string | null;
    fullNameArabic: string;
    fullNameEnglish: string;
    dateOfBirth: string;
    nationality: string;
    gender: number;
    country: string;
    city: string;
    fullAddress: string;
    aboutMe: string | null;
    socialMediaLinks: ILinksRequest[];
}