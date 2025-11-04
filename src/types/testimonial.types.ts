export type TTestimonial = {
  _id: string;
  name: string;
  imageUrl: string;
  designation: string;
  rating : number;
  role: "tutor" | "guardian";
  review: string;
  createdAt: string;
  updatedAt: string;
};