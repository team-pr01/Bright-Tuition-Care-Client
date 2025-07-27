import { RxArrowTopRight } from "react-icons/rx";
import Container from "../../Reusable/Container/Container";

const Banner = () => {
  return (
    <Container>
      <div className="bg-primary-10 rounded-3xl p-4 md:p-12 font-Nunito relative">
        <h1 className="text-2xl md:text-4xl lg:text-[44px] leading-5 md:leading-10 lg:leading-12 text-center font-bold text-white max-w-[800px] mx-auto">
          Unlock Smarter Education With One Simple Registration Step
        </h1>
        <p className="text-sm lg:text-base leading-5 lg:leading-6 text-center font-medium mt-4 text-white max-w-[655px] mx-auto">
          Join our trusted platform connecting students, guardians, and tutors.
          Simplify the way you learn or teach with easy registration, verified
          profiles, and smart tools—anytime, anywhere, on mobile.
        </p>

        <div className="flex items-center gap-4 justify-center mt-8">
          <button className="bg-white hover:bg-transparent border border-white hover:text-white text-primary-10 flex items-center gap-2 leading-[24px] w-fit rounded-lg font-semibold font-Nunito cursor-pointer transition-all duration-300 py-2 lg:py-3 px-3 lg:px-6 text-sm md:text-lg">
            Hire A Tutor <RxArrowTopRight className="text-2xl font-black" />
          </button>
          <button className="hover:bg-white border border-white hover:text-primary-10 text-white flex items-center gap-2 leading-[24px] w-fit rounded-lg font-semibold font-Nunito cursor-pointer transition-all duration-300 py-2 lg:py-3 px-3 lg:px-6 text-sm md:text-lg">
            Become A Tutor <RxArrowTopRight className="text-2xl font-black" />
          </button>
        </div>

        {/* Shapes */}
        <div className="absolute top-0 right-0 h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="457"
            height="364"
            viewBox="0 0 457 364"
            fill="none"
          >
            <path
              opacity="0.07"
              d="M9.93993 444.334C57.3409 336.273 447.319 177.41 521.654 286.017C585.875 379.848 313.178 489.493 352.337 257.65C371.139 146.327 469.45 -4.16067 571.473 -18.921"
              stroke="white"
              stroke-width="20"
            />
          </svg>
        </div>
        <div className="absolute top-0 left-0 h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="455"
            height="364"
            viewBox="0 0 455 364"
            fill="none"
          >
            <path
              opacity="0.07"
              d="M444.913 440.334C397.512 332.273 7.53452 173.41 -66.8005 282.017C-131.022 375.848 141.675 485.493 102.517 253.65C83.7139 142.327 -14.5966 -8.16067 -116.619 -22.921"
              stroke="white"
              stroke-width="20"
            />
          </svg>
        </div>
      </div>
    </Container>
  );
};

export default Banner;
