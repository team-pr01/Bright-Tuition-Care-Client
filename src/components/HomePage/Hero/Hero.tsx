import { ICONS, IMAGES } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import Container from "../../Reusable/Container/Container";
import Heading from "../../Reusable/Heading/Heading";

const Hero = () => {
  return (
    <Container>
      <div className="flex flex-row font-Nunito h-fit justify-between gap-[44px] my-[84px] ">
        <div className="w-[55%] flex flex-col justify-start">
          <div className="flex flex-row gap-3 mb-4 ">
            <p className="text-lg text-neutral-10 font-semibold leading-[24px]">
              0177296232
            </p>
            <img src={ICONS.phone} alt="WhatsApp Icon" className="w-6 h-6" />
          </div>
          <Heading
            titleParts={[
              { text: "Perfect" },
              { text: "Tutor", highlight: true },
              { text: "or Dream" },
              { text: "Tutoring", highlight: true },
              { text: "Job – All in One Place!" },
            ]}
            description="Whether you're a student seeking expert guidance or a tutor looking for new opportunities — our platform connects you in just a few clicks. Learn smarter. Teach better."
            headingClassName="text-[56px] leading-[64px] tracking-[-1.68px]"
          />
          <div className="flex flex-col gap-2 mt-11">
            <h3 className="text-lg leading-[24px] text-neutral-20">Student</h3>
            <div className="flex flex-row items-center justify-start gap-2">
              <div>
                <img
                  src={IMAGES.engagedStudents}
                  alt="Student Image"
                  className="H-10 w-[90px]"
                />
              </div>
              <div className="flex flex-row items-center justify-start gap-1">
                <p className="text-neutral-20 text-xl font-bold leading-[24px] ">
                  1250
                </p>
                <img src={ICONS.plus} alt="Student Image" className="size-5" />
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-5 mt-12 items-center">
            <Button
              label="Hire A Tutor (it's free)"
              variant="primary"
              icon={ICONS.topRightArrow}
            />
            <p className="font-lg leading-[24px] text-neutral-20">
              Want to become a Tutor?{" "}
              <span className="font-semibold bg-gradient-to-l from-accent-10 to-accent-20 bg-clip-text text-transparent">
                Sign Up
              </span>
            </p>
          </div>
        </div>

        {/* Right Image Content */}
        <div className="w-[45%]">
          <img
            src={IMAGES.heroSection}
            alt="Hero Section"
            className="w-auto h-full"
          />
        </div>
      </div>
      {/* Left Content */}
    </Container>
  );
};

export default Hero;
