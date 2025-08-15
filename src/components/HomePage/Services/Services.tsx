import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

import { IMAGES } from "../../../assets";
import Container from "../../Reusable/Container/Container";
import Heading from "../../Reusable/Heading/Heading";
import ServiceCard from "./ServiceCard";
import { useRef } from "react";

const categories = [
  {
    image: IMAGES.service1,
    title: "Admission Test",
    description:
      "Get expert tutors for Dakhil, Alim, and academic Islamic studies.",
  },
  {
    image: IMAGES.service2,
    title: "Madrasa Medium",
    description:
      "Get expert tutors for Dakhil, Alim, and academic Islamic studies.",
  },
  {
    image: IMAGES.service3,
    title: "English Medium",
    description:
      "Tutors for Edexcel, Cambridge (O/A Levels), and IB curriculum.",
  },
  {
    image: IMAGES.service3,
    title: "English Medium",
    description:
      "Tutors for Edexcel, Cambridge (O/A Levels), and IB curriculum.",
  },
  {
    image: IMAGES.service3,
    title: "English Medium",
    description:
      "Tutors for Edexcel, Cambridge (O/A Levels), and IB curriculum.",
  },
  {
    image: IMAGES.service3,
    title: "English Medium",
    description:
      "Tutors for Edexcel, Cambridge (O/A Levels), and IB curriculum.",
  },
];

const Services = () => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div
      className="w-full py-9 lg:py-[50px] font-Nunito overflow-hidden"
      style={{
        background: "linear-gradient(101deg, #FFF -7.84%, #E8F3FF 74.03%)",
      }}
    >
      <Container>
        <div className="text-center mb-12">
          <Heading
            titleParts={[{ text: "Education Service Categories" }]}
            description="We provide expert tutors across all major education systems — whether you're in Bangla, English, Madrasa medium, or preparing for admission tests."
            align="center"
            headingClassName="text-center"
          />
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          // navigation={{
          //   prevEl: prevRef.current,
          //   nextEl: nextRef.current,
          // }}
          onBeforeInit={(swiper) => {
            if (
              swiper.params.navigation &&
              typeof swiper.params.navigation !== "boolean"
            ) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          className="w-full !pb-[60px]"
          breakpoints={{
            375: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <ServiceCard
                image={category.image}
                title={category.title}
                description={category.description}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-swiper-pagination mt-6 flex justify-center items-center gap-2" />
      </Container>
    </div>
  );
};

export default Services;
