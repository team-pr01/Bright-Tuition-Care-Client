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
  tuitionType: string;
  category: string;
  tutoringTime: string;
  tutoringDays: string;
  subjects: string;
  otherRequirements?: string;
  preferredTutorGender: "male" | "female" | "any";
  numberOfStudents: number;
  studentGender: "male" | "female" | "any";
  class: string;
  city: string;
  area: string;
  address: string;
  locationDirection: string;
  status?: "pending" | "live" | "closed" | "cancelled";
  applications: string[];
  postedBy: string;
  postedByModel: "User" | "Guardian";
};
