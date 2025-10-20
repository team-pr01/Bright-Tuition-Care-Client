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
    description:
      "Tutors for university, medical, engineering, and institutional exams.",
  },
  {
    image: IMAGES.arbi,
    title: "Madarsa Medium",
    description:
      "Expert tutors for Dakhil, Alim, and academic Islamic studies.",
  },
  {
    image: IMAGES.banglaMedium,
    title: "Bangla Medium",
    description:
      "Academic support for all subjects (Class 1-12) following the national curriculum.",
  },
  {
    image: IMAGES.drawing,
    title: "Drawing & Art",
    description:
      "Lessons in drawing, painting, sketching, and various creative art forms.",
  },
  {
    image: IMAGES.englishMedium,
    title: "English Medium",
    description:
      "Tutors for Edexcel, Cambridge (O/A Levels), and IB curriculum subjects.",
  },
  {
    image: IMAGES.englishVersion,
    title: "English Version",
    description:
      "Academic support for all grades based on the national curriculum in English.",
  },
  {
    image: IMAGES.languageLearning,
    title: "Language Learning",
    description:
      "Master new languages like English, French, Spanish, Japanese, and more.",
  },
  {
    image: IMAGES.professionalSkillDevelopment,
    title: "Professional Skills",
    description:
      "Courses in software, coding and business for career growth.",
  },
  {
    image: IMAGES.specialChildEducation,
    title: "Special Education",
    description:
      "Tailored education and guidance for children with special needs.",
  },
  {
    image: IMAGES.specialSkillDevelopment,
    title: "Special Skills & Hobbies",
    description:
      "Lessons for non-academic hobbies like music, photography, and cooking.",
  },
  {
    image: IMAGES.testPreparation,
    title: "Standardized Test Prep",
    description:
      "Preparation for international tests like SAT, GRE, GMAT, IELTS, and TOEFL.",
  },
  {
    image: IMAGES.uniHelp,
    title: "University Help",
    description:
      "Specialized tutoring and project guidance for undergraduate and graduate courses.",
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
