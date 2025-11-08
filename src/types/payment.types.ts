export type TPayment = {
  userId: {
    name: string;
    phoneNumber: string;
  };
  imageUrl: string; // for payment proof
  senderAccountNumber: string;
  transactionId?: string;
  paymentMethod: string;
  bankName?: string; // if payment method id bank
  amount: string;
  paidFor: string;
  status: "pending" | "approved";
  createdAt: Date | string;
  updatedAt: Date | string;
};
