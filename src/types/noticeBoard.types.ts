export type TNotice = {
  _id: string;
  title: string;
  description: string;
  targetedAudience: "tutor" | "guardian" | "all";
  createdAt: string;
  updatedAt: string;
};
