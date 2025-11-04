import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  studentOrGuardianSteps,
  tutorSteps,
} from "../../../constants/stepsData";

const AuthSteps = ({ activeTab }: { activeTab: string }) => {
  return activeTab === "Guardian/Student" ? (
    <div className="w-full">
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
        pagination={{
          clickable: true,
        }}
        className="pb-10!"
      >
        {studentOrGuardianSteps.map((step, i) => (
          <SwiperSlide key={i}>
            <div className="text-center flex flex-col font-Nunito items-center justify-center mx-auto">
              <div className="bg-primary-10 rounded-full flex items-center justify-center size-24 p-5">
                <img src={step?.icon} alt={step?.title} className="size-20" />
              </div>
              <h3 className="text-lg lg:text-[26px] font-bold text-neutral-10 mt-4">
                {step?.title}
              </h3>
              <p className="text-sm text-neutral-10 mt-3 lg:mt-0 2xl:mt-4">
                {step?.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  ) : (
    <div className="w-full">
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
        pagination={{
          clickable: true,
        }}
        className="w-full mx-auto pb-10!"
      >
        {tutorSteps.map((step, i) => (
          <SwiperSlide key={i}>
            <div className="text-center flex flex-col font-Nunito items-center mx-auto">
              <div className="bg-primary-10 rounded-full flex items-center justify-center size-24 p-5 text-5xl text-white">
                {step?.icon}
              </div>
              <h3 className="text-lg lg:text-[26px] font-bold text-neutral-10 mt-4">
                {step?.title}
              </h3>
              <p className="text-sm text-neutral-10 mt-3">
                {step?.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AuthSteps;
