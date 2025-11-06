export type TStaff = {
  _id: string;
  userId: {
    _id: string;
    name : string;
    email : string;
    phoneNumber : string;
    city : string;
    area : string;
  };
  pagesAssigned: string[];
  jobRole: string;
  createdAt: string;
  updatedAt: string;
};
