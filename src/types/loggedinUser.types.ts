export type TLoggedInUser = {
  _id: string;
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: "tutor" | "guardian" | "staff" | "admin" | string;
};