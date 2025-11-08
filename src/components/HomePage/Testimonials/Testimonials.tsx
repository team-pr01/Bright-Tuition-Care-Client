import Container from "../../Reusable/Container/Container";
import Heading from "../../Reusable/Heading/Heading";
import TestimonialCard from "./TestimonialCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ICONS } from "../../../assets";
import { FaChevronRight } from "react-icons/fa";
import Button from "../../Reusable/Button/Button";
import { Link } from "react-router-dom";
import type { TTestimonial } from "../../../types/testimonial.types";

interface TestimonialsProps {
  title: string;
  description?: string;
  variant?: "default" | "primary";
  buttonText: string;
  navigatePath: string;
  data?: TTestimonial[];
  isLoading: boolean
}

const Testimonials: React.FC<TestimonialsProps> = ({
  title,
  description,
  variant,
  buttonText,
  navigatePath,
  data,
  isLoading
}) => {
  return (
    <div className="py-12 w-full font-Nunito overflow-hidden">
      <Container>
        <div className="text-center flex flex-col items-center justify-center gap-5 mb-16">
          <Heading
            titleParts={[{ text: title }]}
            description={description}
            align="center"
          />
          <Link to={navigatePath}>
            {" "}
            <Button
              label={buttonText}
              variant="primary"
              icon={ICONS.topRightArrow}
            />
          </Link>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: "#prevButton",
              nextEl: "#nextButton",
            }}
            className="w-full mx-auto"
          >
            {data?.map((testimonial) => (
              <SwiperSlide key={testimonial?._id} className="overflow-visible">
                <TestimonialCard
                  testimonial={testimonial}
                  variant={variant}
                  isLoading={isLoading}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center justify-between w-full absolute top-0 bottom-0 z-20 px-2">
            <button
              id="prevButton"
              className="size-[50px] rounded-full bg-primary-10 hover:bg-primary-10/80 transition duration-300 flex items-center justify-center text-white text-2xl cursor-pointer"
            >
              <FaChevronRight className="rotate-180" />
            </button>
            <button
              id="nextButton"
              className="size-[50px] rounded-full bg-primary-10 hover:bg-primary-10/80 transition duration-300 flex items-center justify-center text-white text-2xl cursor-pointer"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Mobile navigation & pagination */}
          <div className="lg:hidden flex flex-col items-center justify-center gap-6 mt-6 md:mt-14">
            <div className="flex items-center gap-6">
              <button
                id="prevButton"
                className="size-9 rounded-full bg-primary-10 hover:bg-primary-10/80 transition duration-300 flex items-center justify-center text-white text-xl cursor-pointer"
              >
                <FaChevronRight className="rotate-180" />
              </button>
              <button
                id="nextButton"
                className="size-9 rounded-full bg-primary-10 hover:bg-primary-10/80 transition duration-300 flex items-center justify-center text-white text-xl cursor-pointer"
              >
                <FaChevronRight />
              </button>
            </div>

            {/* Move pagination dots below */}
            <div className="swiper-pagination !relative !mt-4"></div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Testimonials;
