import React from "react";
import Container from "../../Reusable/Container/Container";
import Heading from "../../Reusable/Heading/Heading";
import TestimonialCard from "./TestimonialCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import type SwiperCore from "swiper";
import { IMAGES } from "../../../assets";
interface TestimonialsProps {
  title: string;
  description?: string; 
  variant?: "default" | "primary"; // Optional variant prop for future use
}
const Testimonials: React.FC<TestimonialsProps> = ({ title,description,variant }) => {
  return (
    <div className="py-12 w-full bg-gradient-to-r from-[#E8F3FF] to-white">
      <Container>
        <div className="text-center mb-12">
          <Heading
            titleParts={[{ text: title }]}
            description={description}
            align="center"
            className="w-full max-w-2xl mx-auto"
          />
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          className="w-full mx-auto"
        >
          <SwiperSlide>
            <TestimonialCard
              image={IMAGES.aboutUs}
              name="Tanvir Rahman"
              role="Math Tutor, Dhaka"
              rating={4}
              review="I joined the platform just 3 months ago, and I’ve already connected with 5 great students. The process is easy and fast — it truly changed my career!"
              variant={variant}
            />
          </SwiperSlide>

          {/* Add more slides here */}
        </Swiper>
      </Container>
    </div>
  );
};

export default Testimonials;
