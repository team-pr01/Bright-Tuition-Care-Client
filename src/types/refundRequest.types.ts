
export type TRefundRequest = {
  _id : string;
  userId: string;
  tutorId: string;
  jobId: string;
  amount: string;
  refundReason: string;
  status?: "pending" | "accepted" | "rejected";
  createdAt?: Date;
  updatedAt?: Date;
};
