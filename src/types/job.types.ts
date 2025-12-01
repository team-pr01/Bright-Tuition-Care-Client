/* eslint-disable @typescript-eslint/no-explicit-any */
export type TJobApplication = {
  tutor: string;
  appliedOn?: Date;
  status?: "pending" | "shortlisted" | "appointed" | "confirmed" | "rejected";
  selectedTutor?: string;
  isWithdrawn?: boolean;
  withdrawnOn?: Date;
};
export type TJobs = {
  _id: string;
  jobId: string | any;
  title: string;
  salary: number;
  tuitionType: string[];
  category: string;
  tutoringTime: string;
  tutoringDays: string;
  subjects: string[];
  otherRequirements?: string;
  preferredTutorGender: "male" | "female" | "any";
  numberOfStudents: number;
  studentsInstituteName: string;
  studentGender: "male" | "female" | "any";
  class: string;
  curriculum?: string;
  city: string;
  area: string;
  address: string;
  locationDirection: string;
  guardianName?: string;
  guardianPhoneNumber?: string;
  status?: "pending" | "live" | "closed" | "cancelled";
  applications: string[];
  postedBy: string;
  postedByModel: "User" | "Guardian";
  createdAt: string;
  updatedAt: string;
};
