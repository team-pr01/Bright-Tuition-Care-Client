export type TLead = {
  _id: string;
  leadId ?: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
  };
  tutorId: {
    _id: string;
    tutorId: string;
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
