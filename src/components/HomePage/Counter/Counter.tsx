import { FaChevronRight } from "react-icons/fa";
import Container from "../../Reusable/Container/Container";
import { stats } from "./counter.dt";
import CounterCard from "./CounterCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Counter = () => {
  return (
    <Container>
      <div className="flex flex-col gap-10 font-Nunito py-[50px] bg-primary-30/40 p-5 lg:p-10 xl:p-16 rounded-2xl">
        <div className="flex flex-col lg:flex-row justify-center lg:items-center gap-10 items-start lg:gap-5 xl:gap-20 ">
          {stats.map((stat, index) => (
            <CounterCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>

        <div className="relative">
          <div className="max-w-[70%] md:max-w-[85%] lg:max-w-[90%] mx-auto">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              // slidesPerView={1}
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
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
              className="w-full mx-auto"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => (
                <SwiperSlide key={i}>
                  <div className="border border-primary-10 text-primary-10 px-4 py-2 rounded-lg text-center">
                    Cumilla(100)
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="flex items-center justify-between w-full absolute top-0 bottom-0 z-20">
            <button
              id="prevButton"
              className="size-7 md:size-9 text-sm md:text-base rounded-full border border-primary-10 hover:bg-primary-10/80 hover:text-white transition duration-300 flex items-center justify-center text-primary-10 cursor-pointer"
            >
              <FaChevronRight className="rotate-180" />
            </button>
            <button
              id="nextButton"
              className="size-7 md:size-9 text-sm md:text-base rounded-full border border-primary-10 hover:bg-primary-10/80 hover:text-white transition duration-300 flex items-center justify-center text-primary-10 cursor-pointer"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Counter;
