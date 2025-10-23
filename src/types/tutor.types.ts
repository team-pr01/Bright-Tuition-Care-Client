/* eslint-disable @typescript-eslint/no-explicit-any */

// Educational Information Types
export type TEducation = {
  degree:
    | "SSC / O Level"
    | "HSC / A Level"
    | "Diploma"
    | "Bachelor"
    | "Honours"
    | "Masters"
    | "Doctorate";
  instituteName: string;
  medium?: string;
  group?: string;
  department?: string;
  semester?: number;
  year?: string;
  result: string;
  passingYear?: number;
};

// Experience Type
export type TExperience = {
  totalExperience: number;
  experienceDetails: string;
};

// Identity File Type
export type TIdentityFile = {
  front: string; // required file URL/path
  back?: string; // optional
};

// Identity Information
export type TIdentityInformation = {
  fileType:
    | "SSC/Marksheet/Certificate"
    | "HSC/Marksheet/Certificate"
    | "NID/Passport/BirthCertificate"
    | "AdmissionSlip/UniversityId/Certificate"
    | "Others";

  file: TIdentityFile;
};

// Personal Information
export type TPersonalInformation = {
  phoneNumber: string;
  address: string;
  gender: "male" | "female" | "other";
  dateOfBirth: Date;
  fatherName: string;
  motherName: string;
  nationality: string;
};

// Emergency Information
export type TEmergencyInformation = {
  emergencyContactPersonName: string;
  phoneNumber: string;
  relation: string;
  address: string;
};

// Tuition Preference
export type TAvailabilityInformation = {
  from: string; // day string, e.g., "Saturday"
  to: string; // day string, e.g., "Thursday"
};

export type TTuitionPreference = {
  availabilityInformation: TAvailabilityInformation;
  city: string;
  location: string;
  preferredLocation: string;
  expectedSalary: number;
  tuitionStyle: "One-to-One" | "One-to-Many" | "Online-Tutoring";
  preferredCategories: string[]; // enum will be applied later
  preferredClasses: string[]; // enum from Play to Intermediate 2nd year
  preferredSubject: string;
  placeOfTuition: "My Home" | "Students Home" | "Online";
};

// Tutor Interface
export type TTutor = {
  _id: string;
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  city: string;
  area: string;
  isSuspended: boolean;
  createdAt: string;
  tutorId: string | any;
  rating: number;
  imageUrl?: string;
  profileCompleted: number; // %
  resume: string;
  overview: string;
  profileStatus: "locked" | "unlocked";
  isVerified?: boolean;
  personalInformation: TPersonalInformation;
  emergencyInformation: TEmergencyInformation;
  educationalInformation: TEducation[];
  tuitionPreference: TTuitionPreference;
  experience: TExperience[];
  identityInformation: TIdentityInformation[];
};
