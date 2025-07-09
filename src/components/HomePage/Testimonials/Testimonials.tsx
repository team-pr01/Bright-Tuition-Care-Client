import React, { useRef } from "react";
import Container from "../../Reusable/Container/Container";
import Heading from "../../Reusable/Heading/Heading";
import TestimonialCard from "./TestimonialCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay  } from "swiper/modules";
import { IMAGES } from "../../../assets";

interface TestimonialsProps {
  title: string;
  description?: string;
  variant?: "default" | "primary";
}

const Testimonials: React.FC<TestimonialsProps> = ({
  title,
  description,
  variant,
}) => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="py-12 w-full ">
      <Container>
        <div className="text-center mb-12">
          <Heading
            titleParts={[{ text: title }]}
            description={description}
            align="center"
            className="w-full max-w-2xl mx-auto"
          />
        </div>

        <div className="flex items-center gap-4 mb-6 justify-center">
          <button
            ref={prevRef}
            className="p-2 rounded-lg bg-white border border-neutral-60 hover:bg-gray-100 transition duration-300"
          >
            Left
          </button>
          <button
            ref={nextRef}
            className="p-2 rounded-lg bg-primary-10 border border-primary-10 hover:bg-primary-10/80 transition duration-300"
          >
            Right
          </button>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          autoplay={{
    delay: 3000, // 3 seconds
    disableOnInteraction: false,
  }}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            if (
              swiper.params.navigation &&
              typeof swiper.params.navigation !== "boolean"
            ) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          className="w-full mx-auto"
        >
          {[1, 2, 3, 4].map((_, i) => (
            <SwiperSlide key={i}>
              <TestimonialCard
                image={IMAGES.aboutUs}
                name="Tanvir Rahman"
                role="Math Tutor, Dhaka"
                rating={4}
                review="I joined the platform just 3 months ago, and I’ve already connected with 5 great students. The process is easy and fast — it truly changed my career!"
                variant={variant}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
};

export default Testimonials;
