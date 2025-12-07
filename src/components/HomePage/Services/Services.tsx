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
    image: IMAGES.admissionTest,
    title: "Admission Test",
  },
  {
    image: IMAGES.arbi,
    title: "Madrasa Medium",
  },
  {
    image: IMAGES.banglaMedium,
    title: "Bangla Medium",
  },
  {
    image: IMAGES.drawing,
    title: "Drawing & Art",
  },
  {
    image: IMAGES.englishMedium,
    title: "English Medium",
  },
  {
    image: IMAGES.englishVersion,
    title: "English Version",
  },
  {
    image: IMAGES.languageLearning,
    title: "Language Learning",
  },
  {
    image: IMAGES.professionalSkillDevelopment,
    title: "Professional Skills",
  },
  {
    image: IMAGES.specialChildEducation,
    title: "Special Child Education",
  },
  {
    image: IMAGES.specialSkillDevelopment,
    title: "Special Skills",
  },
  {
    image: IMAGES.testPreparation,
    title: "Test Preparation",
  },
  {
    image: IMAGES.uniHelp,
    title: "University Help",
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
            titleParts={[{ text: "Our Tutoring Services" }]}
            description="Connecting students with expert tutors across all education categories."
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
          {categories.map((category) => (
            <SwiperSlide key={category?.title}>
              <ServiceCard image={category.image} title={category.title} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-swiper-pagination mt-6 flex justify-center items-center gap-2" />
      </Container>
    </div>
  );
};

export default Services;
