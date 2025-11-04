export type TInvoice = {
  _id: string;
  jobId: string;
  tutorId: string;
  amount: number;
  status: "pending" | "paid";
  paidDate?: Date;
};
