export type TLead = {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
  };
  class: string;
  guardianPhoneNumber: string;
  address: string;
  details: string;
  status: "pending" | "canceled" | "confirmed" | "paid";
  paymentMethod?: string;
  paymentAccountNumber?: string;
  createdAt: string;
  updatedAt: string;
};
