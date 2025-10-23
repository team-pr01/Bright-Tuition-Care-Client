export type TConfirmationLetter = {
  _id: string;
  jobId: {
    title : string;
    jobId : string
  };
  tutorId: {
    name: string;
    email: string;
    phoneNumber: string;
  };
  guardianId: {
    name: string;
    email: string;
    phoneNumber: string;
  };
  createdAt: string;
  updatedAt?: string;
};
