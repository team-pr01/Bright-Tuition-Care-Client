import { ICONS, IMAGES } from "../../../assets";
import AnimatedButton from "../../Reusable/AnimatedButton/AnimatedButton";
import Container from "../../Reusable/Container/Container";

const Hero = () => {
  return (
    <Container>
      <div className="flex flex-col gap-8 lg:gap-[44px] lg:flex-row font-Nunito h-fit justify-between py-5 lg:py-[84px]">
        <div className="w-full lg:w-[55%] flex flex-col justify-start mt-5 lg:mt-16">
          <div className="flex flex-row gap-3">
            <p className="text-lg text-neutral-10 font-semibold leading-[24px]">
              0177296232
            </p>
            <img src={ICONS.phone} alt="WhatsApp Icon" className="w-6 h-6" />
          </div>
          <h1 className="text-neutral-10 text-2xl lg:text-[56px] font-bold leading-8 lg:leading-[68px] mt-4">
            Find The Best <span className="text-primary-40">Tutor</span> Today
          </h1>
          <p className="text-neutral-10 text-sm lg:text-lg leading-normal lg:leading-6 max-w-full lg:max-w-[600px] mt-4">
            Whether you're a student seeking expert guidance or a tutor looking
            for new opportunities — our platform connects you in just a few
            clicks. Learn smarter. Teach better.
          </p>
          <div className="flex flex-col md:flex-row gap-5 mt-7 lg:mt-12 items-start md:items-center">
            <AnimatedButton />
            <p className="font-lg leading-[24px] text-neutral-20">
              Want to become a Tutor?{" "}
              <span className="font-semibold bg-gradient-to-r from-primary-10 to-primary-40/60 bg-clip-text text-transparent">
                Sign Up
              </span>
            </p>
          </div>
        </div>

        {/* Right Image Content */}
        {/* <div className="w-full lg:w-[35%] flex flex-col items-center ">
          <div className="flex gap-0 md:gap-5 relative">
            <img
            src={IMAGES.heroImg1}
            alt="Hero Section"
            className="size-[150px]"
          />
          <img
            src={IMAGES.heroImg1}
            alt="Hero Section"
            className="size-[150px]"
          />
          </div>
          <img
            src={IMAGES.heroImg1}
            alt="Hero Section"
            className="absolute bottom-[80px] md:-bottom-[65px] right-0 left-[139px] md:left-[124px] size-[150px]"
          />
        </div> */}
        <div className="w-full lg:w-[35%]">
          <img src={IMAGES.heroImg} alt="Hero Section" className="" />
        </div>
      </div>
      {/* Left Content */}
    </Container>
  );
};

export default Hero;
