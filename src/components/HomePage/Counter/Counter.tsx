/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaChevronRight } from "react-icons/fa";
import Container from "../../Reusable/Container/Container";
import CounterCard from "./CounterCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useGetCounterStatsQuery } from "../../../redux/Features/Job/jobApi";
import { ICONS } from "../../../assets";
import { useRef } from "react";

const Counter = () => {
  const { data } = useGetCounterStatsQuery({});
  const allStats = data?.data;

  const stats = [
    {
      icon: ICONS.briefcase,
      value: allStats?.availableJobs || 0,
      label: "Available Tuition Job",
    },
    {
      icon: ICONS.user,
      value: allStats?.activeTutors || 0,
      label: "Active Tutors",
    },
    {
      icon: ICONS.smiley,
      value: allStats?.happyGuardians || 0,
      label: "Happy Guardians/Students",
    },
    {
      icon: ICONS.trophy,
      value: allStats?.averageRating || 0,
      label: "Ratings",
    },
  ];

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <Container>
      <div className="flex flex-col gap-10 font-Nunito py-[50px] bg-primary-30/40 p-5 lg:p-10 xl:p-16 rounded-2xl overflow-hidden mt-48 xl:mt-10">
        {/* Counter Cards */}
        <div className="flex flex-col lg:flex-row justify-center lg:items-center gap-10 items-start lg:gap-5 xl:gap-20">
          {stats.map((stat, index) => (
            <CounterCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>

        {/* Live Tuition Jobs */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-5 w-full">
          <p className="text-neutral-5 font-semibold">Live Tuition Jobs</p>
          <div className="relative max-w-full lg:max-w-[80%] xl:max-w-[85%] mx-auto">
            <div className="max-w-[75%] md:max-w-[85%] lg:max-w-[87%] xl:max-w-[90%] mx-auto">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onSwiper={(swiper) => {
                  setTimeout(() => {
                    if (swiper.params.navigation) {
                      swiper.params.navigation.prevEl = prevRef.current;
                      swiper.params.navigation.nextEl = nextRef.current;
                      swiper.navigation.destroy();
                      swiper.navigation.init();
                      swiper.navigation.update();
                    }
                  });
                }}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
                className="w-full mx-auto"
              >
                {allStats?.jobsByCity?.map((data: any, index: number) => (
                  <SwiperSlide key={index}>
                    <a
                      href={`/job-board/${data?.city}`}
                      className="block w-full h-full"
                    >
                      <div className="border border-primary-10 text-primary-10 px-4 py-2 rounded-lg text-center text-nowrap hover:bg-primary-10/10 cursor-pointer">
                        {data?.city} ({data?.count})
                      </div>
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between w-full absolute top-1/2 -translate-y-1/2 z-20 px-2 pointer-events-none">
              <button
                ref={prevRef}
                className="pointer-events-auto size-7 md:size-9 text-sm md:text-base rounded-full border border-primary-10 hover:bg-primary-10/80 hover:text-white transition duration-300 flex items-center justify-center text-primary-10 cursor-pointer"
              >
                <FaChevronRight className="rotate-180" />
              </button>

              <button
                ref={nextRef}
                className="pointer-events-auto size-7 md:size-9 text-sm md:text-base rounded-full border border-primary-10 hover:bg-primary-10/80 hover:text-white transition duration-300 flex items-center justify-center text-primary-10 cursor-pointer"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Counter;
